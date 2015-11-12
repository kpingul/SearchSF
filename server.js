'use strict';

var express 	= require('express'),
	bodyParser  = require('body-parser'),
	mongoose    = require('mongoose'),
	app     	= express(),
	config      = require('./server/config/config');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/server/views');
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


app.post('/api/data', function(req, res) {
	var dataSet = new Data({
		title: req.body.title
	});
	dataSet.save(function(err) {
		if(err) res.send(err);

		res.send(dataSet);
	});
});

app.get('/about', function(req,res){
  res.render('about');

});
app.listen(config.port, function() {
	console.log("Listening on port " + config.port);
});

