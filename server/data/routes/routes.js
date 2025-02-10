async function routes(app) {
	const server = require('./server.routes');
	const quizz = require('./quizz.routes');


	app.use('/', server);
	app.use('/quizz', quizz, verifyToken);
}

module.exports = routes;