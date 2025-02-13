const db = require('../models/Models');
const { verifyToken, isAdmin } = require('../security/authjwt');

const assignOrRemoveRole = [verifyToken, async (req, res) => {
	try {
		const { user_id, role_name } = req.body;

		const user = await db.User.findByPk(user_id);
		if (!user) {
			return res.status(404).json({ error: 'Utilisateur non trouvé.' });
		}

		const role = await db.Role.findOne({ where: { role_name } });
		if (!role) {
			return res.status(404).json({ error: 'Rôle non trouvé.' });
		}

		const existingRole = await db.UserRole.findOne({ where: { user_id, role_id: role.role_id } });

		if (existingRole) {
			await db.UserRole.destroy({ where: { user_id, role_id: role.role_id } });
			return res.status(200).json({ message: `Rôle "${role_name}" retiré de l'utilisateur ${user_id}.` });
		}
		else {
			await db.UserRole.create({ user_id, role_id: role.role_id });
			return res.status(201).json({ message: `Rôle "${role_name}" attribué à l'utilisateur ${user_id}.` });
		}
	}
	catch (error) {
		console.error('Erreur assignOrRemoveRole :', error);
		res.status(500).json({ error: 'Erreur lors de la gestion du rôle.', details: error.message });
	}
}];


const allUsers = [
	verifyToken,
	isAdmin,
	async (req, res) => {
		try {
			const usersWithRoles = await db.sequelize.query(
				`
				SELECT u.user_id, u.first_name, u.last_name, u.email, u.created_at, r.role_name
				FROM users u
				LEFT JOIN user_roles ur ON u.user_id = ur.user_id
				LEFT JOIN roles r ON r.role_id = ur.role_id
				`,
				{
					type: db.Sequelize.QueryTypes.SELECT,
				},
			);

			const formattedUsers = usersWithRoles.reduce((acc, user) => {
				const existingUser = acc.find(u => u.id === user.user_id);
				if (existingUser) {
					existingUser.roles.push(user.role_name);
				}
				else {
					acc.push({
						id: user.user_id,
						first_name: user.first_name,
						last_name: user.last_name,
						email: user.email,
						creation_date: user.created_at,
						roles: [user.role_name],
					});
				}
				return acc;
			}, []);

			res.status(200).json(formattedUsers);
		}
		catch (error) {
			console.error('Erreur allUsers :', error);
			res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs', details: error.message });
		}
	},
];

module.exports = { assignOrRemoveRole, allUsers };
