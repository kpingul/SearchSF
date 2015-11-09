'use strict';

var express 	= require('express'),
	bodyParser  = require('body-parser'),
	mongoose    = require('mongoose'),
	app     	= express(),
	config      = require('./server/config/config');


app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

require('./server/routers/router')(app);

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

var yelp = require("yelp").createClient({
  consumer_key: "zbI4z6bbwmxpHCoKLpF0qQ", 
  consumer_secret: "V77AKbIp-OtvQzDQxEubVxWiNtY",
  token: "QTH04f87wjMCvGKookQdH3k3jaFrAOaE",
  token_secret: "Ro9badpwy6wXseUWWGXHrzyYvEY"
});


// app.get('/api/yelp/businesses/:ll/:type', function(req, res) {
// 	var latLng = req.params.ll;
// 	var foodType = req.params.type;
// 	yelp.search({term: foodType, ll: latLng}, function(error, data) {
// 		if( error ) {
// 			res.sendStatus(error);
// 		}

// 		res.send(data);
// 	});
// });
app.post('/api/data', function(req, res) {
	var dataSet = new Data({
		title: req.body.title
	});
	dataSet.save(function(err) {
		if(err) res.send(err);

		res.send(dataSet);
	});
});

app.listen(config.port, function() {
	console.log("Listening on port " + config.port);
});

