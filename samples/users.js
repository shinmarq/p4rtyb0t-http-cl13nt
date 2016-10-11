var partybot = require('./'),
	constants = require('./constants');

// var createUser = {
// 	name: { first: "JC", last: "Velasquez" },
// 	username: "oscarx",
// 	password: "1234",
// 	permissions: ["su"],
// 	image: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/1f2/03a/1a0ed21.jpg"
// }

// partybot.users.create(createUser, function(err, response, body) {
// 	console.log("Err: "+err);
// 	console.log("Status Code: "+response);
// 	console.log("Body: " +JSON.stringify(body, null, 2));
// });

// var getAllInOrganisation = { organisationId: '57f3a270f760e4f8ad97eec4' };

// partybot.users.getAllInOrganisation( getAllInOrganisation, function(err, response, body) {
// 	console.log("Err: "+err);
// 	console.log("Status Code: "+response.statusCode || null);
// 	console.log("Body: " +JSON.stringify(body, null, 2));
// })