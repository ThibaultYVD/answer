const db = require('../models/Models');
const { verifyToken } = require('../security/authjwt');

const getAllQuizz = [
	verifyToken,
	async (req, res) => {
		try {
			const quizz = await db.Quizz.findAll();
			return res.status(200).json({ message: 'Quizzes retrieved successfully', data: quizz });
		}
		catch (error) {
			console.error('Erreur lors de la récupération des quizz :', error);
			return res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
		}
	},
];

const getQuizzWithDetails = async (req, res) => {
	try {
		const { id } = req.params;

		const quizz = await db.sequelize.query(
			`SELECT 
		  q.id AS quizzId, 
		  q.name AS quizzName,
		  qs.id AS questionId,
		  qs.question AS questionText,
		  a.id AS answerId,
		  a.answer AS answerText,
		  a.isAnswer AS isCorrect
		FROM quizzs q
		LEFT JOIN questions qs ON q.id = qs.quizzId
		LEFT JOIN answers a ON qs.id = a.questionId
		WHERE q.id = :id`,
			{
				replacements: { id },
				type: db.Sequelize.QueryTypes.SELECT,
			},
		);

		if (!quizz) {
			return res.status(404).json({ message: 'Quizz non trouvé' });
		}

		// Structurer les données pour obtenir le même format que sur le front
		const result = {
			quizz: [],
		};

		// Créer une structure pour les quizs
		quizz.forEach((item) => {
			const quizzIndex = result.quizz.findIndex(q => q.id === item.quizzId);

			if (quizzIndex === -1) {
				result.quizz.push({
					id: item.quizzId,
					name: item.quizzName,
					questions: [],
				});
			}

			const question = result.quizz.find(q => q.id === item.quizzId).questions;
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
		console.error('Erreur lors de la récupération du quizz :', error);
		res.status(500).json({ message: 'Erreur interne', error });
	}
};


module.exports = { getAllQuizz, getQuizzWithDetails };