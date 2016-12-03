var request = require('request'),
	async = require('async'),
	_ = require('underscore'),
	Cloudinary = require('./Cloudinary/Cloudinary'),
	MapResponse = require('../response_body_mapper/MapResponse'),
	constants = require('../constants');

const URL = constants.BASE_PATH + constants.API_PATH + "/organisations";

function getPromoters(params, callback) {
	var organisationId = params.organisationId;
	var getUrl = URL+"/"+organisationId+"/promoters";
	if(params.promoterId) {
		getUrl = getUrl + "/"+params.promoterId;
	}

	request.get(getUrl, function (error, response, body) {
		if(error == null && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(error, response, null);
		}
	});
};

function create(params, callback) {
	var createUrl = URL +"/" +params.organisationId + "/promoters";
	params = _.omit(params, 'organisationId');

	var options = {
		method: 'post',
		body: params,
		json: true,
		url: createUrl
	};

	request(options, function (error, response, body) {
		if(!error && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();

			callback(null, response, newBody);
		} else {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();

			callback(newBody, response, null);
		}
	});
};

function updatePromoter(params, callback) {
	var updateUrl = URL +"/" +params.organisationId + "/promoters/" + params.promoterId;
	params = _.omit(params, ['organisationId', 'promoterId']);

	var options = {
		method: 'put',
		body: params,
		json: true,
		url: updateUrl
	};

	request(options, function (error, response, body) {
		if(!error && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();

			callback(null, response, newBody);
		} else {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();

			callback(newBody, response, null);
		}
	});
};

function getPromoterByCode(params, callback) {
	var organisationId = params.organisationId;
	var getUrl = URL+"/"+organisationId+"/promoter-code/"+params.promoterCode;

	request.get(getUrl, function (error, response, body) {
		if(error == null && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(error, response, null);
		}
	});
}

module.exports = {
	getPromoters: getPromoters,
	create: create,
	updatePromoter: updatePromoter,
	getPromoterByCode: getPromoterByCode
}