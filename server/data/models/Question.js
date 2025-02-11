module.exports = (sequelize, Sequelize) => {
	const Question = sequelize.define('Question', {
		question_id: {
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
		Question.belongsTo(models.Quiz, { foreignKey: 'quiz_id' });
		Question.hasMany(models.Answer, { foreignKey: 'question_id', onDelete: 'CASCADE' });
	};

	return Question;
};
