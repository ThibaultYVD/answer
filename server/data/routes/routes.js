async function routes(app) {
	const server = require('./server.routes');
	const quiz = require('./quiz.routes');
	const admin = require('./admin.routes');
	const user = require('./user.routes');


	app.use('/', server);
	app.use('/quiz', quiz);
	app.use('/admin', admin);
	app.use('/user', user);
}

module.exports = routes;