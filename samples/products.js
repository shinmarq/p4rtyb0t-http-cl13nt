var partybot = require('./'),
	constants = require('./constants');

var organisationId =  "5800471acb97300011c68cf7";
var venueId = "5800889684555e0011585f3c";
var createProduct = {
	"name": "product name",
	"description": "prod description",
	"price": 999.99,
	"image": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/1f2/03a/1a0ed21.jpg"
}

partybot.products.create(createProduct, function(errors, response, body) {
	console.log("Errors: "+JSON.stringify(errors, null, 2) || null);
	console.log("Response status code: "+response.statusCode || null);
	console.log("Body: "+JSON.stringify(body) || null);
});

// Get All
var getAllParams = {
	organisationId: organisationId,
	venueId: venueId,
	tags: 'table'
};
partybot.products.getProducts(getAllParams, function(errors, response, body) {
	console.log("Errors: "+JSON.stringify(errors, null, 2) || null);
	console.log("Response status code: "+response.statusCode || null);
	console.log("Body: "+JSON.stringify(body) || null);
});

// Get One
var productId = '57ff4e6c10b78b00117ee62d';
var getOneParams = {
	organisationId: organisationId,
	venueId: venueId,
	productId: productId
};
partybot.products.getProducts(getOneParams, function(errors, response, body) {
	console.log("Errors: "+JSON.stringify(errors, null, 2) || null);
	console.log("Response status code: "+response.statusCode || null);
	console.log("Body: "+JSON.stringify(body) || null);
});

// Update
var productId = '57ff4e6c10b78b00117ee62d';
var updateParams = {
	organisationId: organisationId,
	venueId: venueId,
	productId: productId,
	name: "product name",
	description: "prod description",
	price: 99999.99,
	// image: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/1f2/03a/1a0ed21.jpg"
};
partybot.products.update(updateParams, function(errors, response, body) {
	console.log("Errors: "+JSON.stringify(errors, null, 2) || null);
	console.log("Response status code: "+response.statusCode || null);
	console.log("Body: "+JSON.stringify(body) || null);
});