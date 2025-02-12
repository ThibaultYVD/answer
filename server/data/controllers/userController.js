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
			// Supprimer le rôle si déjà existant
			await db.UserRole.destroy({ where: { user_id, role_id: role.role_id } });
			return res.status(200).json({ message: `Rôle "${role_name}" retiré de l'utilisateur ${user_id}.` });
		}
		else {
			// Ajouter le rôle si non existant
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
			const users = await db.User.findAll({
				include: [
					{
						association: 'roles',
						attributes: ['role_name'],
					},
				],
			});

			const usersWithRoles = users.map(user => ({
				id: user.user_id,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				creation_date: user.created_at,
				roles: user.roles.map(role => role.role_name),
			}));

			res.status(200).json(usersWithRoles);
		}
		catch (error) {
			console.error('Erreur allUsers :', error);
			res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs', details: error.message });
		}
	},
];

module.exports = { allUsers };


module.exports = { assignOrRemoveRole, allUsers };
