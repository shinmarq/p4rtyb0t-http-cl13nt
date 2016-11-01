var request = require('request'),
	MapResponse = require('../response_body_mapper/MapResponse'),
	constants = require('../constants');

const GET_ALL = constants.BASE_PATH + constants.API_PATH + "/organisations";

function getAll (callback) {
	request.get(GET_ALL+"/", function (error, response, body) {
		if(error == null && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(error, response, null);
		}
	});
}

function getWithId(organisationId, callback) {
	request.get(GET_ALL+"/"+organisationId, function (error, response, body) {
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
	var options = {
		method: 'post',
		body: params,
		json: true,
		url: GET_ALL
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

function updateWithId(organisationId, params, callback) {
	var options = {
		method: 'put',
		body: params,
		json: true,
		url: GET_ALL+'/'+organisationId
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

function deleteWithId(params, callback) {

	var options = {
		method: 'delete',
		body: params,
		json: true,
		url: GET_ALL+'/'+params.organisationId
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

module.exports={
	getAll: getAll,
	getWithId: getWithId,
	create: create,
	updateWithId: updateWithId,
	deleteWithId: deleteWithId
};