var request = require('request'),
cloudinary = require('cloudinary'),
async = require('async'),
mime = require('mime-types'),
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
				callback(err, null, null);
			}
		})

	function validateMimeType(options, callback) {
		mime = mime.lookup(options.body.image);
		callback(null, null, mime);
	}

	function uploadToCloudinary(options, callback) {
		cloudinary.uploader.upload(options.body.image, function(result) {
			if(result) {
				options.body.image = result.secure_url;
				callback(null, options, result);
			} else {
				callback("Upload failed. Please try again", null, null);
			}
		});	
	}
	
	function postCreateUser(err, options, callback) {
		request(options, function (error, response, body) {

			if(!error && response.statusCode == constants.CREATED) {
				var mapResponse = new MapResponse(body);
				var newBody = mapResponse.mapData();
				callback(null, response, newBody);
			} else {
				callback(body, response, null);
			}
		});
	}
}
// Get All Users
module.exports.getAllInOrganisation = function(params, callback) {
	request.get(URL +"/" +params.organisationId + "/users/", function (error, response, body) {
		if(error == null && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(body, response, null);
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