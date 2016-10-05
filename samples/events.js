"use strict";
var partybot = require('./'),
	constants = require('./constants');

var organisationId = '57f3a270f760e4f8ad97eec4';
var venueId = '57f4681dbb6c3c23633eecc2';
var eventId = '57f4b1fda9fd7b00113ba6c8';

partybot.events.getAllEventsInVenueInOrganisation({organisationId: organisationId, venueId: venueId}, function(err, response, body) {
	console.log("Error: "+err);
	console.log("Status Code: "+response.statusCode);
	console.log("Body :"+JSON.stringify(body));
});

partybot.events.getEventInVenueInOrganisation({organisationId: organisationId, venueId: venueId, eventId: eventId}, function(err, response, body) {
	console.log("Error: "+err);
	console.log("Status Code: "+response.statusCode);
	console.log("Body :"+JSON.stringify(body));
});

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