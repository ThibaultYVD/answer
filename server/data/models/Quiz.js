module.exports = (sequelize, Sequelize) => {
	const Quiz = sequelize.define('quizzes', {
		quiz_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		quiz_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},

	},
	);

	// Ajout des associations
	Quiz.associate = (models) => {

		Quiz.hasMany(models.Question, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });

		Quiz.belongsToMany(models.User, {
			through: models.CompletedQuizes,
			foreignKey: 'quiz_id',
			otherKey: 'user_id',
			onDelete: 'CASCADE',
		});
	};

	return Quiz;
};