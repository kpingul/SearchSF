'use strict';

var express 	= require('express'),
	bodyParser  = require('body-parser'),
	mongoose    = require('mongoose'),
	app     	= express(),
	config      = require('./server/config/config');

mongoose.connect('mongodb://kpingul:spacejam23@ds049104.mongolab.com:49104/heroku_g9j5w3hh');
var Schema = mongoose.Schema;
var DataModel = new Schema({
     title: {
     	type: String,
     	required: true
     },
     createdAt: {
     	type: Date,
     	require: true,
     	default: Date.now
     }
});
var User = mongoose.model('data', DataModel);

app.get('/input', function( req, res ) {

});



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
		//render html page by res.render('template', {data})
