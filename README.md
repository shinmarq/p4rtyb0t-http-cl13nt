##Organizations
```js
var partybot = require
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
var params = {
	organisationId: organisationId,
	name: "Valkyrie",
	description: "Description of Valkyrie"
};

partybot.venues.create(params, function(err, response, body) {
	
	console.log(response.statusCode);
	console.log(body);
	console.log(err);

});

// Update Venue with Organisation Id and Venue Id

// Update Venue with Venue Id
```