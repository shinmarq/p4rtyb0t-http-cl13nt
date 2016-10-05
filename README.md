##Organizations
```js
var partybot = require
// Get all
partybot.organisations.getAll(function(err, response, body) {
	
	if(response.statusCode == constants.SUCCESS) {
		console.log(response.statusCode);
 		console.log(body);
 	}
 	else {
 		console.log(err);
 	}

});
// Get Organisation with id
partybot.organisations.getWithId('57f3a270f760e4f8ad97eec4', function(err, response, body) {
	
	console.log(response.statusCode);
	console.log(body);
	console.log(err);

});
// Create
partybot.organisations.create({name: "New organisation"}, function(err, response, body) {
	
	console.log(response.statusCode);
	console.log(body);
	console.log(err);

});
// Update With Id
partybot.organisations.updateWithId('57f48fa9a9fd7b00113ba6b8', {name: "Fucking Org, men"}, function(err, response, body) {
	
	console.log(response.statusCode);
	console.log(body);
	console.log(err);

});
```