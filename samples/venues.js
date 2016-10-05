"use strict";
var partybot = require('./'),
	constants = require('./constants');

var organisationId = '57f37f24f6892ee1d555471d';
partybot.venues.getAllInOrganisation(organisationId, function(err, response, body) {
	
		console.log(response.statusCode);
		console.log(body);
		console.log(err);

});
var venueId = '57f380f17fb36ae92003647b';
partybot.venues.getWithOriganisationIdAndVenueId(organisationId, venueId, function(err, response, body) {
	
		console.log(response.statusCode);
		console.log(body);
		console.log(err);

});

partybot.venues.getWithId(venueId, function(err, response, body) {
	
		console.log(response.statusCode);
		console.log(body);
		console.log(err);

});

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

var putParams = {
	organisationId: organisationId,
	venueId: venueId,
	name: "Holy",
	description: "Shit"
};

partybot.venues.updateWithOrganisationIdAndVenueId(putParams, function(err, response, body) {
	
	console.log(response.statusCode);
	console.log(body);
	console.log(err);

});