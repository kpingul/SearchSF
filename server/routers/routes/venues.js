'use strict';
var express = require('express');
var	foursquareService = require('../../models/foursquareService');

module.exports = (function() {

	var router = express.Router();

	router.get('/:foodType/:ll', foursquareService.searchVenues); 

	return router;

})();

