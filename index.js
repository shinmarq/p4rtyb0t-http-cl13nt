var constants = require('./constants'),
	organisations = require('./modules/organisations'),
	users = require('./modules/users'),
	venues = require('./modules/venues'),
	events = require('./modules/events'),
	auth = require('./modules/auth');
	products = require('./modules/products'),
	promoters = require('./modules/promoters');

module.exports.organisations = organisations;
module.exports.venues = venues;
module.exports.events = events;
module.exports.auth = auth;
module.exports.users = users;
module.exports.products = products;
module.exports.promoters = promoters;