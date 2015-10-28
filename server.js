var express 	= require('express'),
	bodyParser  = require('body-parser'),
	foursquare  = require('node-foursquare-venues')('RHV1ZD3K1SPFECIGDWMOXRVQ3TGNQTUGA0QF1K1GQJ0EICIF', '4RJLQAZNTF2LE4DCSBHJKNC1BBHDUEQBSHIAFCML4GYPXGNQ'),	
	app     	= express(),
	port    	= process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

app.get('/api/venues/:type', function( req, res ) {
	var type = req.params.type;

	foursquare.venues.explore({near: "San Francisco", query: type, section: "food", radius: "10000", venuePhotos: "1"}, function(err, response) {
		if(err) {
			res.status(500).send({error: "error with API"});
		}
		res.send(response);
	});

});

app.get('/api/venue/:venueId', function( req, res ) {
	var venueId = req.params.venueId;

	foursquare.venues.venue(venueId, {}, function(err, response) {
		if(err) {
			res.status(500).send({error: "error with API"});
		}
		res.send(response);
	});

});

app.get('/api/venue/photos/:venueId', function( req, res ) {
	var venueId = req.params.venueId;

	foursquare.venues.photos(venueId, {}, function(err, response) {
		if(err) {
			res.status(500).send({error: "error with API"});
		}
		res.send(response);
	});

});
app.get('/api/venue/similar/:venueId', function( req, res ) {
	var venueId = req.params.venueId;

	foursquare.venues.similar(venueId, {}, function(err, response) {
		if(err) {
			res.status(500).send({error: "error with API"});
		}
		res.send(response);
	});

});


app.listen(port, function() {
	console.log("Listening on port " + port);
});