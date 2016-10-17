var partybot = require('./'),
	constants = require('./constants');

var organisationId = '5800471acb97300011c68cf7';
var promoterId = '58049d4ec559fc001132654a';
var getAllParams = {
	organisationId: organisationId
};

partybot.promoters.getPromoters(getAllParams, function(err, response, body) {
	console.log("Error: "+err);
	console.log("Response: "+response.statusCode || null);
	console.log("Body: "+JSON.stringify(body, null, 2) || null);
});

var getOne = Object.assign({promoterId}, getAllParams);
partybot.promoters.getPromoters(getOne, function(err, response, body) {
	console.log("Error: "+err);
	console.log("Response: "+response.statusCode || null);
	console.log("Body: "+JSON.stringify(body, null, 2) || null);
});

var createParams = {
	organisationId: organisationId,
	name: { first: "Last", last: "Pogi" },
	image: "Imagelink",
}
partybot.promoters.create(createParams, function(err, response, body) {
	console.log("Error: "+err);
	console.log("Response: "+response.statusCode || null);
	console.log("Body: "+JSON.stringify(body, null, 2) || null);
});