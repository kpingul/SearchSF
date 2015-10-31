'use strict';
var express = require('express');
var foursquareService = require('../../models/foursquareService');

module.exports = (function() {

	var router = express.Router();

	router.get('/:venueId', foursquareService.getVenue);

	return router;

})();




