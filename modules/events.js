var request = require('request'),
	_ = require('underscore'),
	MapResponse = require('../response_body_mapper/MapResponse'),
	constants = require('../constants');

const URL = constants.BASE_PATH + constants.API_PATH + "/organisations";
const VENUE_URL = constants.BASE_PATH + constants.API_PATH + "/venues";
const EVENT_URL = constants.BASE_PATH + constants.API_PATH + "/events";
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
function get(params, callback) {
	const GET_URL = EVENT_URL + "/" + params.eventId;
	var newParams = _.omit(params, ['organisationId', 'venueId']);
	var options = {
		url: GET_URL,
		qs: newParams
	}
	request.get(options, function (error, response, body) {
		// console.log(error, response.statusCode, body.d);
		if(error == null && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(body, response, null);
		}		
	});
}
function create(params, callback) {
	const POST_URL = URL+"/"+params.organisationId+"/venues/"+params.venueId+"/events";
	var newParams = _.omit(params, ['organisationId', 'venueId']);
	var options = {
		method: 'post',
		body: newParams,
		json: true,
		url: POST_URL
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

// function update(params, callback) {
// 	const UPDATE_URL = EVENT_URL + "/" + params.eventId;
// 	var newParams = _.omit(params, ['organisationId', 'venueId', 'eventId']);
// 	var options = {
// 		method: 'put',
// 		body: newParams,
// 		json: true,
// 		url: UPDATE_URL
// 	}
// 	request(options, function (error, response, body) {
// 		// console.log(error, response.statusCode, body.d);
// 		if(error == null && response.statusCode == constants.CREATED) {
// 			var mapResponse = new MapResponse(body);
// 			var newBody = mapResponse.mapData();
// 			callback(null, response, newBody);
// 		} else {
// 			callback(body, response, null);
// 		}		
// 	});
// }

function update(params, callback) {
	const UPDATE_URL = URL + "/" + params.organisationId + "/events/" + params.eventId;
	var newParams = _.omit(params, ['organisationId', 'venueId', 'eventId']);
	var options = {
		method: 'put',
		body: newParams,
		json: true,
		url: UPDATE_URL
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

function deleteEvent(params, callback) {
	const DELETE_URL = URL + "/" + params.organisationId + "/events/" + params.eventId;
	var options = {
		method: 'delete',
		json: true,
		url: DELETE_URL
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

function getSorted(params, callback) {
	const GET_URL = URL + "/" + params.organisationId + "/events/bot";
	var options = {
		url: GET_URL,
		qs: params
	}

	request.get(options, function (error, response, body) {
		// console.log(error, response.statusCode, body.d);
		if(error == null && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(body, response, null);
		}		
	});
};
module.exports = {
	getAllEventsInVenueInOrganisation: getAllEventsInVenueInOrganisation,
	getEventInVenueInOrganisation: getEventInVenueInOrganisation,
	getEventsInOrganisation: getEventsInOrganisation,
	getSorted: getSorted,
	create: create,
	update: update,
	deleteEvent: deleteEvent,
	get: get
}