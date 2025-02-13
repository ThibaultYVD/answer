const db = require("../model/Models");

const User = db.User;
const Role = db.Role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {

    try {
        const { first_name, last_name, email, password } = req.body;

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires." });
        }

        if (!isPasswordValid(password)) {
            return res.status(400).json({
                message: "Le mot de passe doit contenir au minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
            });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Ce nom d'utilisateur est déjà pris." });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);

        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
            created_at: new Date(),
        });

        res.status(200).json({ message: "Utilisateur enregistré avec succès!" });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

function isPasswordValid(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password)
}

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            return res.status(404).send({ message: "Utilisateur non trouvé." });
        }

        bcrypt.compare(req.body.password, user.password, async function (err, result) {
            if (err) {
                console.error('Erreur lors de la comparaison :', err);
                return res.status(500).send({ message: "Erreur interne." });
            }

            if (result) {
                let authorities = [];
                const roles = await user.getRoles();

                for (let i = 0; i < roles.length; i++) {
                    authorities.push(roles[i].role_name);
                }

                const payload = {
                    id: user.user_id,
                    roles: authorities
                };

                const token = jwt.sign(payload, process.env.SECRET_KEY, {
                    algorithm: 'HS256',
                    expiresIn: '1d'
                });

                req.session.token = token;
                return res.status(200).send({
                    id: user.id,
                    email: user.email,
                    roles: authorities,
                    token: token
                });

            } else {
                return res.status(403).json({ message: "Mot de passe invalide" });
            }
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

exports.signout = async (req, res) => {
    try {

        if (!req.session || !req.session.token) return res.status(200).json({ message: "Vous n'êtes pas connecté." });

        req.session.destroy((err) => {
            if (err) {
                console.error('Erreur lors de la destruction de la session:', err);
                return res.status(500).json({
                    message: "Erreur lors de la déconnexion."
                });
            }

            res.clearCookie('connect.sid');

            return res.status(200).json({
                message: "Vous avez été déconnecté."
            });
        });
    } catch (err) {
        console.error('Erreur interne:', err);
        return res.status(500).json({
            error: "Erreur interne du serveur.", err
        });
    }
};