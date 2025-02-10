const getWelcomeMessage = async (req, res) => {
	try {
		return res.status(200).json({ message: 'Bienvenue sur l\'API du projet Answer !' });
	}
	catch (error) {
		return res.status(500).json({ error: 'Erreur lors de l\'obtention du message de bienvenue.' });
	}
};

module.exports = { getWelcomeMessage };