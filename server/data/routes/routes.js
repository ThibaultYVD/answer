async function routes(app) {
	const server = require('./server.routes');
	const quiz = require('./quiz.routes');


	app.use('/', server);
	app.use('/quiz', quiz, verifyToken);
}

module.exports = routes;