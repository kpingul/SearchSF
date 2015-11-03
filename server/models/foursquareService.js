'use strict';
var	foursquare = require('node-foursquare-venues')('RHV1ZD3K1SPFECIGDWMOXRVQ3TGNQTUGA0QF1K1GQJ0EICIF', '4RJLQAZNTF2LE4DCSBHJKNC1BBHDUEQBSHIAFCML4GYPXGNQ');

module.exports = (function() {

	var fSService = {
		getVenue: getVenue,
		getVenuePhotos: getVenuePhotos,
		getSimilarVenue: getSimilarVenue,
		searchVenues: searchVenues
	};

	return fSService;

	
	function getVenue( req, res ) {
			var venueId = req.params.venueId;

			foursquare.venues.venue(venueId, {}, function(err, response) {
				if(err) {
					res.status(500).send({error: "error with API"});
				}
				res.send(response);
			});
	}

	function getVenuePhotos( req, res ) {
		var venueId = req.params.venueId;

		foursquare.venues.photos(venueId, {}, function(err, response) {
			if(err) {
				res.status(500).send({error: "error with API"});
			}
			res.send(response);
		});
	}


	function getSimilarVenue( req, res ) {
		var venueId = req.params.venueId;

		foursquare.venues.similar(venueId, {}, function(err, response) {
			if(err) {
				res.status(500).send({error: "error with API"});
			}
			res.send(response);
		});

	}

	function searchVenues( req, res ) {
		var type = req.params.foodType;
		var latLng = req.params.ll;

		if(type !== undefined && latLng !== undefined) {
			foursquare.venues.explore({ll: latLng, query: type, radius: "10000", venuePhotos: "1"}, function(err, response) {
				if(err) {
					res.status(500).send({error: "error with API"});
				}
				res.send(response);
			});
		}
	

	}

}());
