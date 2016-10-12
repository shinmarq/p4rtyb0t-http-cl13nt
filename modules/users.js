var request = require('request'),
	cloudinary = require('cloudinary'),
	async = require('async'),
	mime = require('mime-types'),
	_ = require('underscore'),
	MapResponse = require('../response_body_mapper/MapResponse'),
	constants = require('../constants');

const URL = constants.BASE_PATH + constants.API_PATH + "/organisations";

cloudinary.config({ 
	cloud_name: constants.CLOUDINARY_CLOUD_NAME, 
	api_key: constants.CLOUDINARY_API_KEY, 
	api_secret: constants.CLOUDINARY_API_SECRET 
});
// Create User
module.exports.create = function(params, callback) {
	var options = {
		method: 'post',
		body: params,
		json: true,
		url: URL +"/" +params.organisationId + "/users"
	}

	async.waterfall([
		async.apply(uploadToCloudinary, options),
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

	function uploadToCloudinary(options, callback) {
		cloudinary.uploader.upload(options.body.image, function(result) {
			if(result) {
				options.body.image = result.secure_url;
				callback(null, options);
			} else {
				callback("\nUpload failed. Please try again", null);
			}
		});	
	}
	
	function postCreateUser(options, callback) {
		options.body = _.omit(options.body, 'organisationId');
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
// Get All Users
module.exports.getAllInOrganisation = function(params, callback) {
	request.get(URL +"/" +params.organisationId + "/users/", function (error, response, body) {
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

// Get single User
module.exports.getWithOrganisationIdAndUserId = function(params, callback) {
	callback();
}

module.exports.update = function(params, callback) {
	callback();
}