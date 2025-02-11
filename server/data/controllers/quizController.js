const db = require('../models/Models');
const { verifyToken } = require('../security/authjwt');

const getAllQuiz = [verifyToken, async (req, res) => {
	try {
		const quiz = await db.Quiz.findAll();
		return res.status(200).json({ message: 'Quizes retrieved successfully', data: quiz });
	}
	catch (error) {
		console.error('Erreur lors de la récupération des quiz :', error);
		return res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
	}
},
];

const getQuizWithDetails = [verifyToken, async (req, res) => {
	try {
		const { id } = req.params;

		const quizData = await db.sequelize.query(
			`SELECT 
				q.quiz_id AS quizId, 
				q.quiz_name AS quizName,
				qs.question_id AS questionId,
				qs.question AS questionText,
				a.answer_id AS answerId,
				a.answer AS answerText,
				a.isAnswer AS isCorrect
			FROM quizzes q
			LEFT JOIN questions qs ON q.quiz_id = qs.quiz_id
			LEFT JOIN answers a ON qs.question_id = a.question_id
			WHERE q.quiz_id = :id`,
			{
				replacements: { id },
				type: db.Sequelize.QueryTypes.SELECT,
			},
		);

		if (!quizData || quizData.length === 0) {
			return res.status(404).json({ message: 'Quiz non trouvé' });
		}

		const result = {
			quiz: [],
		};

		quizData.forEach((item) => {
			const quizIndex = result.quiz.findIndex(q => q.id === item.quizId);

			if (quizIndex === -1) {
				result.quiz.push({
					id: item.quizId,
					name: item.quizName,
					questions: [],
				});
			}

			const question = result.quiz.find(q => q.id === item.quizId).questions;
			const questionIndex = question.findIndex(q => q.question === item.questionText);

			if (questionIndex === -1) {
				question.push({
					question: item.questionText,
					answers: [],
				});
			}

			const answers = question.find(q => q.question === item.questionText).answers;
			answers.push({
				answer: item.answerText,
				isAnswer: item.isCorrect === 1,
			});
		});

		res.status(200).json(result);
	}
	catch (error) {
		console.error('Erreur lors de la récupération du quiz :', error);
		res.status(500).json({ message: 'Erreur interne', error });
	}
}];

const saveQuizStatistics = [verifyToken, async (req, res) => {
	try {
		const user_id = req.userId;

		const { quiz_id, right_answers, wrong_answers } = req.body;

		const quiz = await db.Quiz.findOne({ where: { quiz_id } });

		if (!quiz) {
			return res.status(404).json({ error: 'Quiz non trouvé.' });
		}

		const result = await db.CompletedQuizes.create({
			quiz_id,
			user_id,
			right_answers,
			wrong_answers,
		});

		res.status(201).json({ message: 'Quiz response saved successfully', result });
	}
	catch (error) {
		res.status(500).json({ error: error });
	}
}];

const getQuizStatistics = [verifyToken, async (req, res) => {
	try {
		const userId = req.userId;

		const completedQuizes = await db.sequelize.query(
			`SELECT cq.quiz_id, cq.right_answers, cq.wrong_answers, cq.added_at, q.quiz_name 
			FROM completed_quizes cq
			JOIN quizzes q ON cq.quiz_id = q.quiz_id
			WHERE cq.user_id = :userId`,
			{
				replacements: { userId },
				type: db.Sequelize.QueryTypes.SELECT,
			},
		);


		if (!completedQuizes || completedQuizes.length === 0) {
			return res.status(404).json({ message: 'Aucun quiz complété trouvé pour cet utilisateur.' });
		}

		res.status(200).json({
			message: 'Statistiques des quiz récupérées avec succès.',
			data: completedQuizes.map((quiz) => ({
				quiz_id: quiz.quiz_id,
				quiz_name: quiz.quiz_name,
				right_answers: quiz.right_answers,
				wrong_answers: quiz.wrong_answers,
				added_at: quiz.added_at,
			})),

		});
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
}];


module.exports = { getAllQuiz, getQuizWithDetails, saveQuizStatistics, getQuizStatistics };