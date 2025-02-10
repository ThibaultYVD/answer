module.exports = (sequelize, Sequelize) => {
	const Answer = sequelize.define('Answer', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		answer: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		isAnswer: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});

	// Ajout des associations
	Answer.associate = (models) => {
		Answer.belongsTo(models.Question, { foreignKey: 'questionId' });
	};

	return Answer;
};
