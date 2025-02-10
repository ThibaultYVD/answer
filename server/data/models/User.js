module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
		user_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		first_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		last_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		created_at: {
			type: Sequelize.DATE,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});

	User.associate = (models) => {
		User.belongsToMany(models.Role, {
			through: models.UserRole,
			foreignKey: 'user_id',
			otherKey: 'role_id',
		});
	};

	return User;
};