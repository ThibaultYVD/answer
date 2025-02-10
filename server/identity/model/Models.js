const config = require("../config/db.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        },
        define: {
            timestamps: false
        },
        //logging: false
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User.js")(sequelize, Sequelize);
db.Role = require("./Role.js")(sequelize, Sequelize)
db.UserRole = require('./UserRole.js')(sequelize, Sequelize);

// Configuration des relations
Object.values(db).forEach((model) => {
	if (model.associate) {
		model.associate(db);
	}
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
