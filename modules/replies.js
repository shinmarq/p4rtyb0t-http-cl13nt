// ./modules/replies.js
var request = require('request'),
	async = require('async'),
	_ = require('underscore'),
	MapResponse = require('../response_body_mapper/MapResponse'),
	constants = require('../constants');

const URL = constants.BASE_PATH + constants.API_PATH + "/organisations";

exports.getReplyPerVenue = function(params, callback) {
	var options = {};
	if(params.replyId) {
		options = {
			url: URL + "/" + params.organisationId + "/venues/" + params.venueId + "/replies/" + params.replyId,
			qs: _.omit(params, ['organisationId', 'venueId', 'replyId'])
		};
	} else {
		options = {
			url: URL + "/" + params.organisationId + "/venues/" + params.venueId + "/replies",
			qs: _.omit(params, ['organisationId', 'venueId', 'replyId'])
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

exports.getReplyPerOrganisation = function(params, callback) {
	var options = {};
	if(params.replyId){
		options = {
			url: URL + "/" + params.organisationId + "/replies/"+params.replyId,
			qs: _.omit(params, ['organisationId', 'venueId', 'replyId'])
		};
	} else {
		options = {
			url: URL + "/" + params.organisationId + "/replies",
			qs: _.omit(params, ['organisationId', 'venueId', 'replyId'])
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

exports.getReplyForBot = function(params, callback) {
	var options = {};
	options = {
		url: URL + "/" + params.organisationId + "/venues/" + params.venueId + "/replies/bot",
		qs: _.omit(params, ['organisationId', 'venueId', 'replyId'])
	};
	
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

exports.createReply = function(params, callback) {
	var postUrl = '';
	if(params.venueId) {
		postUrl = URL + "/" + params.organisationId + "/venues/" + params.venueId + "/replies";
	} else {
		postUrl = URL + "/" + params.organisationId + "/replies";
	}
	var newParams = _.omit(params, ['organisationId', 'venueId', 'replyId']);
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

exports.updateReply = function(params, callback) {
	var newParams = _.omit(params, ['organisationId', 'venueId', 'replyId']);
	var options = {
			url: URL + "/" + params.organisationId + "/venues/" + params.venueId + "/replies/" + params.replyId,
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

exports.deleteReply = function(params, callback) {

};