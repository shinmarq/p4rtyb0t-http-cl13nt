var partybot = require('../'),
	constants = require('../constants');

partybot.organisations.getAll(function(err, response, body) {
	
		console.log(body);
		console.log(err);

});

// partybot.organisations.getWithId('57f3a270f760e4f8ad97eec4', function(err, response, body) {
	
// 	console.log(response.statusCode);
// 	console.log(body);
// 	console.log(err);

// });

// partybot.organisations.create({name: "New organisation"}, function(err, response, body) {
	
// 	console.log(response.statusCode);
// 	console.log(body);
// 	console.log(err);

// });

// partybot.organisations.updateWithId('57f48fa9a9fd7b00113ba6b8', {name: "Fucking Org, men"}, function(err, response, body) {
	
// 	console.log(response.statusCode);
// 	console.log(body);
// 	console.log(err);

// });

// var params={
// 	organisationId: '5800471acb97300011c68cf7'
// };
// partybot.organisations.deleteWithId(params, function(err, response, body) {
// 	console.log(response.statusCode);
// 	console.log(body);
// 	console.log(err);
// });
