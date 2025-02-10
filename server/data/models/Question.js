module.exports = (sequelize, Sequelize) => {
	const Question = sequelize.define('Question', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		question: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});

	// Ajout des associations
	Question.associate = (models) => {
		Question.belongsTo(models.Quizz, { foreignKey: 'quizzId' });
		Question.hasMany(models.Answer, { foreignKey: 'questionId', onDelete: 'CASCADE' });
	};

	return Question;
};
