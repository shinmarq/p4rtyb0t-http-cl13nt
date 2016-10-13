##Organizations
```js
var partybot = require('partybot-http-client');
// Get all
partybot.organisations.getAll(function(err, response, body) {
	
	if(response.statusCode == constants.SUCCESS) {
		console.log(response.statusCode);
		console.log(body);
	}
	else {
		console.log(err);
	}

});
// Get Organisation with id
partybot.organisations.getWithId('57f3a270f760e4f8ad97eec4', function(err, response, body) {
	
	console.log(response.statusCode);
	console.log(body);
	console.log(err);

});
// Create
partybot.organisations.create({name: "New organisation"}, function(err, response, body) {
	
	console.log(response.statusCode);
	console.log(body);
	console.log(err);

});
// Update With Id
partybot.organisations.updateWithId('57f48fa9a9fd7b00113ba6b8', {name: "Update Organisation Name"}, function(err, response, body) {
	
	console.log(response.statusCode);
	console.log(body);
	console.log(err);

});
```
##Venues
```js
var organisationId = '57f3a270f760e4f8ad97eec4';

// Get All Venues in an Organisation
partybot.venues.getAllInOrganisation(organisationId, function(err, response, body) {
	
		console.log(response.statusCode);
		console.log(body);
		console.log(err);

});

var venueId = '57f380f17fb36ae92003647b';
// Get Venue with Organisation Id and Venue Id
partybot.venues.getWithOriganisationIdAndVenueId(organisationId, venueId, function(err, response, body) {
	
		console.log(response.statusCode);
		console.log(body);
		console.log(err);

});

// Get Venue directly
partybot.venues.getWithId(venueId, function(err, response, body) {
	
		console.log(response.statusCode);
		console.log(body);
		console.log(err);

});

// Create venue in a organisation
var createParams = {
	organisationId: organisationId,
	name: "Venue Name",
	description: "Venue description",
	image: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/1f2/03a/1a0ed21.jpg"
};

partybot.venues.create(params, function(err, response, body) {
	
	console.log(response.statusCode);
	console.log(body);
	console.log(err);

});

// Update Venue with Organisation Id and Venue Id

// Update Venue with Venue Id
organisationId = '57f3a270f760e4f8ad97eec4';
venueId = '57ff62f710b78b00117ee63a';
var updateParams = {
	organisationId: organisationId,
	venueId: venueId,
	name: "Venue Name",
	description: "Venue description",
	image: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/1f2/03a/1a0ed21.jpg"
};

partybot.venues.updateWithOrganisationIdAndVenueId(updateParams, function(err, response, body) {
	cl("Error: " +JSON.stringify(err, null, 2));
	cl("Response : " +response.statusCode || null);
	cl("Body: " +JSON.stringify(body, null, 2));
});
```

###Events
```js

var organisationId = '57f3a270f760e4f8ad97eec4';
var venueId = '57f4681dbb6c3c23633eecc2';
var eventId = '57f4b1fda9fd7b00113ba6c8';

// Get All Events In Venue In Organisation
partybot.events.getAllEventsInVenueInOrganisation({organisationId: organisationId, venueId: venueId}, function(err, response, body) {
	console.log("Error: "+err);
	console.log("Status Code: "+response.statusCode);
	console.log("Body :"+JSON.stringify(body));
});

// Get Event In Venue In Organisation
partybot.events.getEventInVenueInOrganisation({organisationId: organisationId, venueId: venueId, eventId: eventId}, function(err, response, body) {
	console.log("Error: "+err);
	console.log("Status Code: "+response.statusCode);
	console.log("Body :"+JSON.stringify(body));
});
// Create Event

var createParams = {
		organisationId: organisationId,
		venueId: venueId,
		name: "Event",
		description: "Description of Event"
}

partybot.events.create(createParams, function(err, response, body) {
	console.log("Error: "+JSON.stringify(err));
	console.log("Status Code: "+response.statusCode);
	console.log("Body :"+JSON.stringify(body));
});
```

###Users
```js
var organisationId =  "57f3a270f760e4f8ad97eec4";
var userId = "57fdade284cd6200113dbed1";
var createUser = {
	organisationId: organisationId,
	name: { first: "JC", last: "Velasquez" },
	username: "scasro",
	password: "1234",
	permissions: ["su"],
	image: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/1f2/03a/1a0ed21.jpg"
}

partybot.users.create(createUser, function(errors, response, body) {
	console.log("Errors: "+JSON.stringify(errors, null, 2) || null);
	console.log("Response status code: "+response.statusCode || null);
	console.log("Body: "+JSON.stringify(body) || null);
});

partybot.users.getAllInOrganisation({organisationId: organisationId}, function(errors, response, body) {
	console.log("Errors: "+JSON.stringify(errors, null, 2) || null);
	console.log("Response status code: "+response.statusCode || null);
	console.log("Body: "+JSON.stringify(body, null, 2) || null);
});
```
All update parameters are optional except organisationId and userId. Just put the keys that you want to update.
```js
var updateUser = {
	organisationId: organisationId,
	userId: userId,
	name: { first: "JC", last: "Velasquez" },
	username: "scasrzoo",
	password: "1234",
	permissions: ["su"],
	image: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/1f2/03a/1a0ed21.jpg"
};

partybot.users.update(updateUser, function(errors, response, body) {
	console.log("Errors: "+JSON.stringify(errors, null, 2) || null);
	console.log("Response status code: "+response.statusCode || null);
	console.log("Body: "+JSON.stringify(body) || null);
});
```
###Product
```js
var organisationId =  "57f3a270f760e4f8ad97eec4";
var venueId = "57ff62f710b78b00117ee63a";
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

Get All
var getAllParams = {
	organisationId: organisationId,
	venueId: venueId
};
partybot.products.getProducts(getAllParams, function(errors, response, body) {
	console.log("Errors: "+JSON.stringify(errors, null, 2) || null);
	console.log("Response status code: "+response.statusCode || null);
	console.log("Body: "+JSON.stringify(body) || null);
});

Get One
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
```