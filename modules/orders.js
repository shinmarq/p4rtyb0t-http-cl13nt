var request = require('request'),
	_ = require('underscore'),
	MapResponse = require('../response_body_mapper/MapResponse'),
	constants = require('../constants');

const URL = constants.BASE_PATH + constants.API_PATH + "/organisations";

module.exports.getOrders = function (params, callback) {

	var GET_URL = URL+"/"+params.organisationId+"/orders";
	if(params.orderId) {
		GET_URL = GET_URL + "/" + params.orderId;
	}
	
	var options = {
		url: GET_URL,
		qs: params
	}
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

module.exports.createOrder = function(params, callback) {
	var CREATE_URL = URL+"/"+params.organisationId+"/orders";
	var newParams = _.omit(params, 'organisationId, _id');
	var options = {
		url: CREATE_URL,
		method: 'post',
		json: true,
		body: newParams
	};

	request(options, function(error, response, body) {
		if(!error && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(error, response, null);
		}
	});
}

module.exports.udpateOrder = function(params, callback) {
	var UPDATE_URL = URL+"/"+params.organisationId+"/orders/"+params.orderId;
	var newParams = _.omit(params, ['organisationId', '_id']);
	var options = {
		url: UPDATE_URL,
		method: 'put',
		json: true,
		body: newParams
	};

	request(options, function(error, response, body) {
		if(!error && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(body, response, null);
		}
	});
}
