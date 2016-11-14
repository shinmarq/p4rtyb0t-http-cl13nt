// ./modules/replies.js
var request = require('request'),
	async = require('async'),
	_ = require('underscore'),
	MapResponse = require('../response_body_mapper/MapResponse'),
	constants = require('../constants');

const URL = constants.BASE_PATH + constants.API_PATH + "/organisations";

exports.getReply = function(params, callback) {
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
		if(err) {
			callback(body, res, []);
		} else {
			callback(null, res, body);
		}
	});
};

exports.createReply = function(params, callback) {
	var postUrl = URL + "/" + params.organisationId + "/venues/" + params.venueId + "/replies";
	var newParams = _.omit(params, ['organisationId', 'venueId', 'replyId']);
	var options = {
		method: 'post',
		body: newParams,
		json: true,
		url: postUrl
	};

	request(options, function(err, res, body) {
		if(err) {
			callback(body, res, []);
		} else {
			callback(null, res, body);
		}
	});
};

exports.updateReply = function(params, callback) {

};

exports.deleteReply = function(params, callback) {

};