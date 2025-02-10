module.exports = (sequelize, Sequelize) => {
	const Quizz = sequelize.define('Quizz', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	// Ajout des associations
	Quizz.associate = (models) => {
		Quizz.hasMany(models.Question, { foreignKey: 'quizzId', onDelete: 'CASCADE' });
	};

	return Quizz;
};