var request = require('request'),
	_ = require('underscore'),
	MapResponse = require('../response_body_mapper/MapResponse'),
	constants = require('../constants');

const URL = constants.BASE_PATH + constants.API_PATH + "/organisations";
const VENUE_URL = constants.BASE_PATH + constants.API_PATH + "/venues";

function getAllEventsInVenueInOrganisation(params, callback) {
	const GET_URL = URL+"/"+params.organisationId+"/venues/"+params.venueId+"/events";
	request.get(
		GET_URL, 
		function(error, response, body) {
			if(!error && response.statusCode == constants.SUCCESS) {
				var mapResponse = new MapResponse(body);
				var newBody = mapResponse.mapData();
				callback(null, response, newBody);
			} else {
				callback(error, response, null);
			}
	});
}

function getEventInVenueInOrganisation(params, callback) {
	const GET_URL = URL+"/"+params.organisationId+"/venues/"+params.venueId+"/events/"+params.eventId;
	request.get(
		GET_URL, 
		function(error, response, body) {
			if(!error && response.statusCode == constants.SUCCESS) {
				var mapResponse = new MapResponse(body);
				var newBody = mapResponse.mapData();
				callback(null, response, newBody);
			} else {
				callback(error, response, null);
			}
	});
}

function getEventsInOrganisation(params, callback) {
	var options = {
		url: URL+"/"+params.organisationId+"/events",
		qs: _.omit(params, ['organisationId'])
	};
	request.get(
		options, 
		function(error, response, body) {
			if(!error && response.statusCode == constants.SUCCESS) {
				var mapResponse = new MapResponse(body);
				var newBody = mapResponse.mapData();
				callback(null, response, newBody);
			} else {
				callback(error, response, null);
			}
	});
}
function create(params, callback) {
	var options = {
		method: 'post',
		body: params,
		json: true,
		url: URL
	}
	request(options, function (error, response, body) {
		// console.log(error, response.statusCode, body.d);
		if(error == null && response.statusCode == constants.CREATED) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(body, response, null);
		}		
	});
}

module.exports = {
	getAllEventsInVenueInOrganisation: getAllEventsInVenueInOrganisation,
	getEventInVenueInOrganisation: getEventInVenueInOrganisation,
	getEventsInOrganisation: getEventsInOrganisation,
	create: create
}