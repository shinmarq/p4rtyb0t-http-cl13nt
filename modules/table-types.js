var request = require('request'),
	Cloudinary = require('./Cloudinary/Cloudinary'),
	async = require('async'),
	_ = require('underscore'),
	mime = require('mime-types'),
	MapResponse = require('../response_body_mapper/MapResponse'),
	constants = require('../constants');

const URL = constants.BASE_PATH + constants.API_PATH + "/organisations";
// Create TableType
module.exports.create = function(params, callback) {
	var options = {
		method: 'post',
		body: params,
		json: true,
		url: URL +"/" +params.organisationId + "/venues/" +params.venueId + "/table-types"
	}
	options.body = _.omit(options.body, ['organisationId', 'venueId']);
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

	// async.waterfall([
	// 	async.apply(Cloudinary.uploadToCloudinary, options),
	// 	postCreateUser
	// 	],
	// 	function(err, response, body) {
	// 		if(!err) {
	// 			callback(null, response, body);
	// 		} else {
	// 			callback(err, response, null);
	// 		}
	// 	});

	// // function validateMimeType(options, callback) {
	// // 	mime = mime.lookup(options.body.image);
	// // 	callback(null, null, mime);
	// // }
		
	// function postCreateUser(options, callback) {
	// 	options.body = _.omit(options.body, ['organisationId', 'venueId']);
	// 	request(options, function (error, response, body) {
	// 		if(!error && response.statusCode == constants.SUCCESS) {
	// 			var mapResponse = new MapResponse(body);
	// 			var newBody = mapResponse.mapData();

	// 			callback(null, response, newBody);
	// 		} else {
	// 			var mapResponse = new MapResponse(body);
	// 			var newBody = mapResponse.mapData();

	// 			callback(newBody, response, null);
	// 		}
	// 	});
	// }
}

// Update a TableType
module.exports.update = function(params, callback) {
	var updateUrl = URL +"/" +params.organisationId + "/venues/" +params.venueId + "/table-types/"+ params.tableTypeId;
	var newParams = _.omit(params, ['organisationId', 'venueId', 'tableTypeId']);
	var options = {
		method: 'put',
		body: newParams,
		json: true,
		url: updateUrl
	}

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
	// async.waterfall([
	// 	async.apply(Cloudinary.uploadToCloudinary, options),
	// 	postUpdateUser
	// 	],
	// 	function(err, response, body) {
	// 		if(!err) {
	// 			callback(null, response, body);
	// 		} else {
	// 			callback(err, response, null);
	// 		}
	// 	});

	// // function validateMimeType(options, callback) {
	// // 	mime = mime.lookup(options.body.image);
	// // 	callback(null, null, mime);
	// // }
		
	// function postUpdateUser(options, callback) {
	// 	options.body = _.omit(options.body, ['organisationId', 'venueId']);
	// 	request(options, function (error, response, body) {
	// 		if(!error && response.statusCode == constants.SUCCESS) {
	// 			var mapResponse = new MapResponse(body);
	// 			var newBody = mapResponse.mapData();

	// 			callback(null, response, newBody);
	// 		} else {
	// 			var mapResponse = new MapResponse(body);
	// 			var newBody = mapResponse.mapData();

	// 			callback(newBody, response, null);
	// 		}
	// 	});
	// }
}

// Get All TableTypes
module.exports.getTableType = function(params, callback) {
	var getUrl;
	var options = {};
	if(params.tableTypeId) {
		getUrl = URL +"/" +params.organisationId + "/venues/" +params.venueId + "/table-types/"+ params.tableTypeId;
	} else {
		
	}
	options = {
		url: getUrl,
		qs: _.omit(params, ['organisationId'])
	};
	request.get(options, function (error, response, body) {
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
}

module.exports.getTableTypesInOrganisation = function (params, callback) {
	var getUrl;
	if(params.tableTypeId) {
		getUrl = URL +"/" +params.organisationId + "/table-types/"+ params.tableTypeId;
	} else {
		getUrl = URL +"/" +params.organisationId + "/table-types/";
	}
	var options = {
		url: getUrl,
		qs: _.omit(params, ['organisationId'])
	};
	request.get(options, function (error, response, body) {
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
}