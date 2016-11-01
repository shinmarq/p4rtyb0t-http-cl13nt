var request = require('request'),
	async = require('async'),
	_ = require('underscore'),
	Cloudinary = require('./Cloudinary/Cloudinary'),
	MapResponse = require('../response_body_mapper/MapResponse'),
	constants = require('../constants');

const URL = constants.BASE_PATH + constants.API_PATH + "/organisations";
const VENUE_URL = constants.BASE_PATH + constants.API_PATH + "/venues";

function getAllInOrganisation (params, callback) {
	var options = {
		url: URL+"/"+params.organisationId+"/venues",
		qs: _.omit(params, ['organisationId'])
	};
	request.get(options, function (error, response, body) {
		if(error == null && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(error, response, null);
		}
	});
};

function getWithOriganisationIdAndVenueId (params, callback) {
	var options = {
		url: URL+"/"+params.organisationId+"/venues/"+params.venueId,
		qs: _.omit(params, ['organisationId', 'venueId'])
	}
	request.get(options, function (error, response, body) {
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
	var createUrl = URL +"/" +params.organisationId + "/venues";
	params = _.omit(params, 'organisationId');
	var options = {
		method: 'post',
		body: params,
		json: true,
		url: createUrl
	};

	request(options, function (error, response, body) {
		if(error == null && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(body, response, null);
		}
	});
	// async.waterfall([
	// 	async.apply(Cloudinary.uploadToCloudinary, options),
	// 	postSaveVenue
	// 	], function(err, response, body) {
	// 		if(!err) {
	// 			callback(null, response, body);
	// 		} else {
	// 			callback(err, response, null);
	// 		}
	// 	});
	
	// function postSaveVenue(options, callback) {
	// 	request(options, function (error, response, body) {
	// 		if(error == null && response.statusCode == constants.SUCCESS) {
	// 			var mapResponse = new MapResponse(body);
	// 			var newBody = mapResponse.mapData();
	// 			callback(null, response, newBody);
	// 		} else {
	// 			callback(body, response, null);
	// 		}
	// 	});
	// }
	
};


function updateWithOrganisationIdAndVenueId(params, callback) {

	var updateUrl = URL +"/" +params.organisationId + "/venues/" + params.venueId;
	params = _.omit(params, ['organisationId', 'venueId']);
	var options = {
		method: 'put',
		body: params,
		json: true,
		url: updateUrl
	};

	request(options, function (error, response, body) {
		if(error == null && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(body, response, null);
		}
	});
	// async.waterfall([
	// 	async.apply(Cloudinary.uploadToCloudinary, options),
	// 	postSaveVenue
	// 	], function(err, response, body) {
	// 		if(!err) {
	// 			callback(null, response, body);
	// 		} else {
	// 			callback(err, response, null);
	// 		}
	// 	});
	
	// function postSaveVenue(options, callback) {
	// 	request(options, function (error, response, body) {
	// 		if(error == null && response.statusCode == constants.SUCCESS) {
	// 			var mapResponse = new MapResponse(body);
	// 			var newBody = mapResponse.mapData();
	// 			callback(null, response, newBody);
	// 		} else {
	// 			callback(body, response, null);
	// 		}
	// 	});
	// }

};

function updateVenueWithId(params, callback) {
	

};

function deleteWithId(params, callback) {

	var deleteUrl = URL +"/" +params.organisationId + "/venues/" + params.venueId;
	var options = {
		method: 'delete',
		url: deleteUrl
	};

	request(options, function (error, response, body) {
		if(error == null && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(body, response, null);
		}
	});
}

module.exports = {
	getAllInOrganisation: getAllInOrganisation,
	getWithOriganisationIdAndVenueId: getWithOriganisationIdAndVenueId,
	getWithId: getWithId,
	create: create,
	updateWithOrganisationIdAndVenueId: updateWithOrganisationIdAndVenueId,
	deleteWithId: deleteWithId
}