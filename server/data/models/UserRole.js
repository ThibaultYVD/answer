module.exports = (sequelize, Sequelize) => {
	const ProductsLists = sequelize.define('user_role', {
		user_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			references: {
				model: 'users',
				key: 'user_id',
			},
			onDelete: 'CASCADE',
		},
		user_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			references: {
				model: 'roles',
				key: 'role_id',
			},
			onDelete: 'CASCADE',
		},
		added_at: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
	}, {
		timestamps: false,
	});

	return ProductsLists;
};