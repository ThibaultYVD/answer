const db = require('../models/Models');
const { verifyToken, isAdmin } = require('../security/authjwt');

const assignRole = [verifyToken, async (req, res) => {
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
			return res.status(400).json({ error: 'L\'utilisateur possède déjà ce rôle.' });
		}

		await db.UserRole.create({ user_id, role_id: role.role_id });

		res.status(201).json({ message: `Rôle "${role_name}" attribué à l'utilisateur ${user_id}.` });
	}
	catch (error) {
		console.error('Erreur assignRole :', error);
		res.status(500).json({ error: 'Erreur lors de l\'affectation du rôle.', details: error.message });
	}
}];

module.exports = { assignRole };
