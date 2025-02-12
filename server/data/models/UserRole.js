module.exports = (sequelize, Sequelize) => {
	const ProductsLists = sequelize.define('user_role', {
		user_id: {
			type: Sequelize.INTEGER,
			references: {
				model: 'users',
				key: 'user_id',
			},
			onDelete: 'CASCADE',
		},
		role_id: {
			type: Sequelize.INTEGER,
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