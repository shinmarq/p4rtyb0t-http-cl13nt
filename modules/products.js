var request = require('request'),
	Cloudinary = require('./Cloudinary/Cloudinary'),
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

// Update a product
module.exports.update = function(params, callback) {
	var updateUrl = URL +"/" +params.organisationId + "/products/"+ params.productId;
	var newParams = _.omit(params, ['organisationId', 'venueId', 'productId']);
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

module.exports.deleteProduct = function(params, callback) {
	var updateUrl = URL +"/" +params.organisationId + "/products/"+ params.productId;
	var options = {
		method: 'delete',
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

}
// Get All Products
module.exports.getProducts = function(params, callback) {
	var getUrl;
	if(params.productId) {
		getUrl = URL +"/" +params.organisationId + "/venues/" +params.venueId + "/products/"+ params.productId;
	} else {
		if(params.tags)
			getUrl = URL +"/" +params.organisationId + "/venues/" +params.venueId + "/products/?tags="+params.tags;
		else
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

module.exports.getProductsInOrganisation = function (params, callback) {
	var getUrl;
	if(params.productId) {
		getUrl = URL +"/" +params.organisationId + "/products/"+ params.productId;
	} else {
		getUrl = URL +"/" +params.organisationId + "/products/";
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