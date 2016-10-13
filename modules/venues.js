var request = require('request'),
	async = require('async'),
	_ = require('underscore'),
	Cloudinary = require('./Cloudinary/cloudinary'),
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
	var createUrl = URL +"/" +params.organisationId + "/venues";
	params = _.omit(params, 'organisationId');
	var options = {
		method: 'post',
		body: params,
		json: true,
		url: createUrl
	};

	async.waterfall([
		async.apply(Cloudinary.uploadToCloudinary, options),
		postSaveVenue
		], function(err, response, body) {
			if(!err) {
				callback(null, response, body);
			} else {
				callback(err, response, null);
			}
		});
	
	function postSaveVenue(options, callback) {
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

	async.waterfall([
		async.apply(Cloudinary.uploadToCloudinary, options),
		postSaveVenue
		], function(err, response, body) {
			if(!err) {
				callback(null, response, body);
			} else {
				callback(err, response, null);
			}
		});
	
	function postSaveVenue(options, callback) {
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