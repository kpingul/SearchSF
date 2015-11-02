'use strict';

var express 	= require('express'),
	bodyParser  = require('body-parser'),
	mongoose    = require('mongoose'),
	app     	= express(),
	config      = require('./server/config/config');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
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
var Data = mongoose.model('data', DataModel);

app.get('/api/allData', function( req, res ) {
	Data.find({}, function(err, userData) {
		if(err) {
			res.send(err);
		}

		if(userData.length) {
			res.send(userData);
		}


	});
});

app.post('/api/data', function(req, res) {
	console.log(req.body.title);
	var dataSet = new Data({
		title: req.body.title
	});

	dataSet.save(function(err) {
		if(err) res.send(err);

		res.send(dataSet);
	});
});



require('./server/routers/router')(app);


app.listen(config.port, function() {
	console.log("Listening on port " + config.port);
});

// create API for venue/idOfVenue
	//once the request is sent from client
	//req.params
	//foursquare.venues.venue(findVenueById)
		//render html page by res.render('template', {data})
