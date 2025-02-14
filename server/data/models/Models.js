const config = require('../config/database.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
	config.DB,
	config.USER,
	config.PASSWORD,
	{
		host: config.HOST,
		dialect: config.dialect,
		pool: {
			max: config.pool.max,
			min: config.pool.min,
			acquire: config.pool.acquire,
			idle: config.pool.idle,
		},
		define: {
			timestamps: false,
		},
		logging: true,
	},
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Quiz = require('./Quiz.js')(sequelize, Sequelize);
db.Question = require('./Question.js')(sequelize, Sequelize);
db.Answer = require('./Answer.js')(sequelize, Sequelize);
db.User = require('./User.js')(sequelize, Sequelize);
db.Role = require('./Role.js')(sequelize, Sequelize);
db.UserRole = require('./UserRole.js')(sequelize, Sequelize);
db.CompletedQuizes = require('./CompletedQuizes.js')(sequelize, Sequelize);

// Configuration des relations
Object.values(db).forEach((model) => {
	if (model.associate) {
		model.associate(db);
	}
});

(async () => {
	await sequelize.sync();
	console.log('Les modèles sont synchronisés avec la base de données.');

	const quizData = [
		{
			quiz_name: 'quiz 1',
			Questions: [
				{
					question: 'Quelle est la couleur du cheval Blanc d\'Henri IV ?',
					Answers: [
						{ answer: 'Blanc', isAnswer: true },
						{ answer: 'Pas Blanc', isAnswer: false },
						{ answer: 'blanc', isAnswer: false },
						{ answer: 'nwar is the new black', isAnswer: false },
					],
				},
				{
					question: 'Quel est le meilleur projet ?',
					Answers: [
						{ answer: 'Un projet raté', isAnswer: false },
						{ answer: 'Answer', isAnswer: true },
					],
				},
				{
					question: 'Qui est le meilleur dev ? (Sacha ne joue pas)',
					Answers: [
						{ answer: 'Jeremy', isAnswer: false },
						{ answer: 'Sacha', isAnswer: true },
						{ answer: 'Charles', isAnswer: false },
						{ answer: 'Atman', isAnswer: false },
						{ answer: 'Thibault', isAnswer: false },
					],
				},
				{
					question: 'Comment est votre blanquette ?',
					Answers: [
						{ answer: 'Euuuh...', isAnswer: false },
						{ answer: 'Elle est bonne.', isAnswer: true },
					],
				},
				{
					question: 'Quel est le meilleur outil pour gérer une équipe Scrum ?',
					Answers: [
						{ answer: 'Notion', isAnswer: false },
						{ answer: 'Jira', isAnswer: true },
					],
				},
			],
		},
		{
			quiz_name: 'quiz 2',
			Questions: [
				{
					question: 'Quel langage utilise Sequelize ?',
					Answers: [
						{ answer: 'Python', isAnswer: false },
						{ answer: 'JavaScript', isAnswer: true },
						{ answer: 'Ruby', isAnswer: false },
					],
				},
				{
					question: 'Dans quel langage est écrit Node.js ?',
					Answers: [
						{ answer: 'C++', isAnswer: false },
						{ answer: 'JavaScript', isAnswer: true },
						{ answer: 'Java', isAnswer: false },
					],
				},
				{
					question: 'Quel framework est utilisé pour le front-end de ce projet ?',
					Answers: [
						{ answer: 'React', isAnswer: false },
						{ answer: 'Vue.js', isAnswer: true },
						{ answer: 'Angular', isAnswer: false },
					],
				},
			],
		},
	];


	for (const quiz of quizData) {
		await db.Quiz.findOrCreate({
			where: {},
			defaults: quiz,
			include: [{
				model: db.Question,
				include: [db.Answer],
			}],
		});
	}

	await db.Role.findOrCreate({
		where: { role_name: 'user' },
		defaults: { role_name: 'user' },
	});

	await db.Role.findOrCreate({
		where: { role_name: 'admin' },
		defaults: { role_name: 'admin' },
	});

	
	console.log('Données insérées avec succès !');
})();


module.exports = db;