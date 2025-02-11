const db = require('../models/Models');
const { param } = require('../routes/admin.routes');
const { verifyToken, isAdmin } = require('../security/authjwt');

const createQuiz = [verifyToken, isAdmin, async (req, res) => {
	try {
		const { quiz_name, questions } = req.body;

		if (!quiz_name || !Array.isArray(questions) || questions.length === 0) {
			return res.status(400).json({ error: 'Le nom du quiz et au moins une question sont obligatoires.' });
		}

		const newQuiz = await db.Quiz.create({ quiz_name });

		console.log(newQuiz);
		for (const q of questions) {
			const newQuestion = await db.Question.create({
				question: q.question,
				quiz_id: newQuiz.quiz_id,
			});

			console.log(newQuestion);

			for (const a of q.answers) {
				await db.Answer.create({
					answer: a.answer,
					isAnswer: a.isAnswer,
					question_id: newQuestion.question_id,
				});
			}
		}

		res.status(201).json({
			message: 'Quiz créé avec succès.',
			quiz_id: newQuiz.quiz_id,
		});
	}
	catch (error) {
		res.status(500).json({ error: 'Erreur lors de la création du quiz.', details: error.message });
	}
}];

const editQuiz = [verifyToken, isAdmin, async (req, res) => {
	try {
		const { quiz_id } = req.params;
		const { quiz_name, questions } = req.body;

		const quiz = await db.Quiz.findOne({ where: { quiz_id } });

		if (!quiz) {
			return res.status(404).json({ error: 'Quiz non trouvé.' });
		}

		await quiz.update({ quiz_name });

		if (Array.isArray(questions)) {
			for (const q of questions) {
				let question = await db.Question.findOne({ where: { question_id: q.question_id, quiz_id } });

				if (question) {
					await question.update({ question: q.question });

					for (const a of q.answers) {
						const answer = await db.Answer.findOne({ where: { answer_id: a.answer_id, question_id: question.question_id } });

						if (answer) {
							await answer.update({ answer: a.answer, isAnswer: a.isAnswer });
						}
						else {
							await db.Answer.create({
								answer: a.answer,
								isAnswer: a.isAnswer,
								question_id: question.question_id,
							});
						}
					}
				}
				else {
					question = await db.Question.create({
						question: q.question,
						quiz_id,
					});

					for (const a of q.answers) {
						await db.Answer.create({
							answer: a.answer,
							isAnswer: a.isAnswer,
							question_id: question.question_id,
						});
					}
				}
			}
		}

		res.status(200).json({
			message: 'Quiz mis à jour avec succès.',
		});
	}
	catch (error) {
		console.error('Erreur lors de la mise à jour du quiz :', error);
		res.status(500).json({ error: 'Erreur lors de la mise à jour du quiz.', details: error.message });
	}
}];


const deleteQuiz = [verifyToken, isAdmin, async (req, res) => {
	try {
		const { quiz_id } = req.params;

		const quiz = await db.Quiz.findByPk(quiz_id);
		if (!quiz) {
			return res.status(404).json({ error: 'Quiz non trouvé.' });
		}

		await db.Question.destroy({ where: { quiz_id: quiz_id } });
		await quiz.destroy();

		res.status(200).json({ message: 'Quiz supprimé avec succès.' });
	}
	catch (error) {
		res.status(500).json({ error: 'Erreur lors de la suppression du quiz.', details: error.message });
	}
}];

module.exports = { createQuiz, editQuiz, deleteQuiz };
