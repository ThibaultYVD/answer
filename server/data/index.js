const express = require('express');
const app = express();
const cors = require('cors');

const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('redis');
const bodyParser = require('body-parser');
app.use(cors());
require('dotenv/config');
const routes = require('./routes/routes');

app.use(express.urlencoded({ extended: true }));

const PORT = 3001;
app.use(bodyParser.json());
app.use(cors());

const redisClient = redis.createClient({
	username: 'default',
	password: process.env.REDIS_PASSWORD,
	socket: {
		host: 'redis-11219.c339.eu-west-3-1.ec2.redns.redis-cloud.com',
		port: 11219,
	},
});
redisClient.connect()
	.then(() => console.log('Connected to Redis successfully!'))
	.catch((err) => console.error('Failed to connect to Redis:', err));

redisClient.on('error', (err) => {
	console.error('Erreur Redis:', err);
});

app.use(session({
	store: new RedisStore({ client: redisClient }),
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		maxAge: 86400000,
	},
}));


routes(app);

app.listen(PORT, () => {
	console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});