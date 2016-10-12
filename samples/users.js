var partybot = require('./'),
	constants = require('./constants');

var organisationId =  "57f3a270f760e4f8ad97eec4";
var createUser = {
	organisationId: organisationId,
	name: { first: "JC", last: "Velasquez" },
	username: "scasro",
	password: "1234",
	permissions: ["su"],
	image: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/1f2/03a/1a0ed21.jpg"
}

partybot.users.create(createUser, function(errors, response, body) {
	console.log("Errors: "+JSON.stringify(errors, null, 2) || null);
	console.log("Response status code: "+response.statusCode || null);
	console.log("Body: "+JSON.stringify(body) || null);
});

partybot.users.getAllInOrganisation({organisationId: organisationId}, function(errors, response, body) {
	console.log("Errors: "+JSON.stringify(errors, null, 2) || null);
	console.log("Response status code: "+response.statusCode || null);
	console.log("Body: "+JSON.stringify(body, null, 2) || null);
});