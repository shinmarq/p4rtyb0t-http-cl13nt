var cloudinary = require('cloudinary'),
	constants = require('../../constants');

cloudinary.config({ 
	cloud_name: constants.CLOUDINARY_CLOUD_NAME, 
	api_key: constants.CLOUDINARY_API_KEY, 
	api_secret: constants.CLOUDINARY_API_SECRET 
});

module.exports.uploadToCloudinary = function(options, callback) {
	if(options.body.image) {
		cloudinary.uploader.upload(options.body.image, function(result) {
			if(result) {
				options.body.image = result.secure_url;
				callback(null, options);
			} else {
				callback("Upload failed. Please try again", null);
			}
		});	
	} else {
		callback(null, options);
	}
}