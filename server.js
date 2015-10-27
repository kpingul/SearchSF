var express = require('express'),
	app     = express(),
	port    = process.env.port || 3000;

console.log(process.env);
app.use(express.static(__dirname + '/'));

app.listen(port, function() {
	console.log("Listening on port " + port);
});