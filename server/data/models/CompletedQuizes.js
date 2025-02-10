module.exports = (sequelize, Sequelize) => {
	const CompletedQuizes = sequelize.define('completed_quizes', {
		user_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			references: {
				model: 'quizs',
				key: 'quiz_id',
			},
			onDelete: 'CASCADE',
		},
		user_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			references: {
				model: 'users',
				key: 'user_id',
			},
			onDelete: 'CASCADE',
		},
		added_at: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
		right_answers: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		wrong_answers: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});

	return CompletedQuizes;
};