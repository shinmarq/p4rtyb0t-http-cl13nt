// ./modules/queries.js
var request = require('request'),
	async = require('async'),
	_ = require('underscore'),
	MapResponse = require('../response_body_mapper/MapResponse'),
	constants = require('../constants');

const URL = constants.BASE_PATH + constants.API_PATH + "/organisations";

exports.getQueryPerVenue = function(params, callback) {
	var options = {};
	if(params.queryId) {
		options = {
			url: URL + "/" + params.organisationId + "/venues/" + params.venueId + "/queries/" + params.queryId,
			qs: _.omit(params, ['organisationId', 'venueId', 'queryId'])
		};
	} else {
		options = {
			url: URL + "/" + params.organisationId + "/venues/" + params.venueId + "/queries",
			qs: _.omit(params, ['organisationId', 'venueId', 'queryId'])
		};
 	}
	request.get(options, function(err, res, body) {
		if(err == null && res.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, res, newBody);
		} else {
			callback(err, res, null);
		}
	});
};

exports.getQueryPerOrganisation = function(params, callback) {
	var options = {};
	if(params.queryId){
		options = {
			url: URL + "/" + params.organisationId + "/queries/"+params.queryId,
			qs: _.omit(params, ['organisationId', 'venueId', 'queryId'])
		};
	} else {
		options = {
			url: URL + "/" + params.organisationId + "/queries",
			qs: _.omit(params, ['organisationId', 'venueId', 'queryId'])
		};
	}
	
	request.get(options, function(err, res, body) {
		if(err == null && res.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, res, newBody);
		} else {
			callback(err, res, null);
		}
	});
}

exports.getQueryForBot = function(params, callback) {
	var getUrl = '';
	var options = {};

	if(params.venueId) {
		getUrl = URL + "/" + params.organisationId + "/venues/" + params.venueId + "/queries";
	} else {
		getUrl = URL + "/" + params.organisationId + "/queries/bot";
	}

	options = {
		url: getUrl,
		qs: _.mapObject( _.omit(params, ['organisationId', 'venueId', 'queryId']), function(value, index) {
			return encodeURIComponent(value);
		})
	};

	request.get(options, function(err, res, body) {
		if(err == null && res.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, res, newBody);
		} else {
			callback(body, res, null);
		}
	});
};

exports.createQuery = function(params, callback) {
	console.log("Create Query");
	var postUrl = '';
	if(params.venueId) {
		postUrl = URL + "/" + params.organisationId + "/venues/" + params.venueId + "/queries";
	} else {
		postUrl = URL + "/" + params.organisationId + "/queries";
	}
	var newParams = _.omit(params, ['organisationId', 'venueId', 'queryId']);
	var options = {
		method: 'post',
		body: newParams,
		json: true,
		url: postUrl
	};
	request(options, function(err, res, body) {
		if(err == null && res.statusCode == constants.CREATED) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, res, newBody);
		} else {
			callback(err, res, null);
		}
	});
};

exports.updateQuery = function(params, callback) {
	var newParams = _.omit(params, ['organisationId', 'venueId', 'queryId']);
	var options = {
			url: URL + "/" + params.organisationId + "/venues/" + params.venueId + "/queries/" + params.queryId,
			method: 'put',
			body: newParams,
			json: true,
		};

	request(options, function(err, res, body) {
		if(err == null && res.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, res, newBody);
		} else {
			callback(err, res, null);
		}
	});
};

exports.deleteQuery = function(params, callback) {

};