var request = require('request'),
	MapResponse = require('../response_body_mapper/MapResponse'),
	constants = require('../constants');

const URL = constants.BASE_PATH + constants.API_PATH + "/organisations";
const VENUE_URL = constants.BASE_PATH + constants.API_PATH + "/venues";
function getAllInOrganisation (organisationId, callback) {
	request.get(URL+"/"+organisationId+"/venues", function (error, response, body) {
		if(error == null && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(error, response, null);
		}
	});
};

function getWithOriganisationIdAndVenueId (organisationId, venueId, callback) {
	request.get(URL+"/"+organisationId+"/venues/"+venueId, function (error, response, body) {
		if(error == null && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(error, response, null);
		}
	});
};

function getWithId(venueId, callback) {
	request.get(VENUE_URL+"/"+venueId, function (error, response, body) {
		if(error == null && response.statusCode == constants.SUCCESS) {
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
		body: { name: params.name, description: params.description },
		json: true,
		url: URL +"/" +params.organisationId + "/venues"
	}

	request(options, function (error, response, body) {

		if(error == null && response.statusCode == constants.CREATED) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(body, response, null);
		}
	});
};


function updateWithOrganisationIdAndVenueId(params, callback) {

	var options = {
		method: 'put',
		body: { name: params.name, description: params.description },
		json: true,
		url: URL +"/" +params.organisationId + "/venues/"+params.venueId
	}

	request(options, function (error, response, body) {
		console.log(error);
		console.log(response.statusCode);
		console.log(body);
		// if(error == null && response.statusCode == constants.CREATED) {
		// 	var mapResponse = new MapResponse(body);
		// 	var newBody = mapResponse.mapData();
		// 	callback(null, response, newBody);
		// } else {
		// 	callback(body, response, null);
		// }
	});

};

function updateVenueWithId(params, callback) {
	

};
module.exports = {
	getAllInOrganisation: getAllInOrganisation,
	getWithOriganisationIdAndVenueId: getWithOriganisationIdAndVenueId,
	getWithId: getWithId,
	create: create,
	updateWithOrganisationIdAndVenueId: updateWithOrganisationIdAndVenueId
}