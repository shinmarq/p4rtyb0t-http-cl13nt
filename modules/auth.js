var request = require('request'),
	MapResponse = require('../response_body_mapper/MapResponse'),
	constants = require('../constants');

const URL = constants.BASE_PATH + constants.API_PATH + "/token";

module.exports.getToken = function(params, callback) {
	var options = {
		headers: {
			Authorization:'Basic b2ZmaWNpYWxBcGlDbGllbnQ6QzBGRkVF'
		},
		method: 'post',
		body: params,
		url: URL,
		json: true
	};

	request(options, function (error, response, body) {
		// console.log(error, response.statusCode, body.d);
		if(error == null && response.statusCode == constants.SUCCESS) {
			var mapResponse = new MapResponse(body);
			var newBody = mapResponse.mapData();
			callback(null, response, newBody);
		} else {
			callback(body, response, null);
		}		
	});
};