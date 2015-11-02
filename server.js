'use strict';

var express 	= require('express'),
	bodyParser  = require('body-parser'),
	app     	= express(),
	config      = require('./server/config/config');

require('./server/routers/router')(app);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


app.listen(config.port, function() {
	console.log("Listening on port " + config.port);
});

// create API for venue/idOfVenue
	//once the request is sent from client
	//req.params
	//foursquare.venues.venue(findVenueById)
		//render html page by res.render('template', {data}) so that the data is binded to templates