var request = require('request'),
	Cloudinary = require('./Cloudinary/cloudinary'),
	async = require('async'),
	_ = require('underscore'),
	mime = require('mime-types'),
	MapResponse = require('../response_body_mapper/MapResponse'),
	constants = require('../constants');

const URL = constants.BASE_PATH + constants.API_PATH + "/organisations";
// Create Product
module.exports.create = function(params, callback) {
	var options = {
		method: 'post',
		body: params,
		json: true,
		url: URL +"/" +params.organisationId + "/venues/" +params.venueId + "/products"
	}

	async.waterfall([
		async.apply(Cloudinary.uploadToCloudinary, options),
		postCreateUser
		],
		function(err, response, body) {
			if(!err) {
				callback(null, response, body);
			} else {
				callback(err, response, null);
			}
		});

	// function validateMimeType(options, callback) {
	// 	mime = mime.lookup(options.body.image);
	// 	callback(null, null, mime);
	// }
		
	function postCreateUser(options, callback) {
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
	}
}

// Update a product
module.exports.update = function(params, callback) {
	callback();
}

// Get All Products
module.exports.getProducts = function(params, callback) {
	var getUrl;
	if(params.productId) {
		getUrl = URL +"/" +params.organisationId + "/venues/" +params.venueId + "/products/"+ params.productId;
	} else {
		getUrl = URL +"/" +params.organisationId + "/venues/" +params.venueId + "/products/";
	}
	request.get(getUrl, function (error, response, body) {
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