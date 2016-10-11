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

// Create Product
module.exports.create = function(params, callback) {
	callback();
}

// Update a product
module.exports.update = function(params, callback) {
	
}

// Get All Products
module.exports.getAllInOrganisationInVenue = function(params, callback) {
	callback();
}

// Get a single Product
module.exports.getInOrganisationInVenue = function(params, callback) {
	callback();
}

