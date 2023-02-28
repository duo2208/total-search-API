const controller = require('./controller/index');

module.exports = function (app) {
	app.use('/', controller);
};
