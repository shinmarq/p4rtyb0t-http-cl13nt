// ./modules/queries.js
var request = require('request'),
	async = require('async'),
	_ = require('underscore'),
	MapResponse = require('../response_body_mapper/MapResponse'),
	constants = require('../constants');

const URL = constants.BASE_PATH + constants.API_PATH + "/organisations";

exports.getSender = function(params, callback) {
	var options = {};
	if(params.senderId) {
		options = {
			url: URL + "/" + params.organisationId + "/senders/" + params.senderId,
			qs: _.omit(params, ['organisationId', 'senderId'])
		};
	} else {
		options = {
			url: URL + "/" + params.organisationId + "/senders/",
			qs: _.omit(params, ['organisationId'])
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

exports.createSender = function(params, callback) {
	var postUrl = URL + "/" + params.organisationId + "/senders";
	var newParams = _.omit(params, ['organisationId', 'venueId', 'queryId']);
	var options = {
		method: 'post',
		body: newParams,
		json: true,
		url: postUrl
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