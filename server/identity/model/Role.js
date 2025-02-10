module.exports = (sequelize, Sequelize) => {
	const Role = sequelize.define('roles', {
		role_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		role_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});

	Role.associate = (models) => {
		Role.belongsToMany(models.User, {
			through: models.UserRole,
			foreignKey: 'role_id',
			otherKey: 'user_id',
		});
	};

	return Role;
};