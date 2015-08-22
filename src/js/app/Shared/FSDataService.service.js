(function(){

	'use strict';

	angular.module('myApp')

		.factory('FSDataService', FSDataService);

		FSDataService.$inject = ['$http'];

		function FSDataService($http){

			var service = {

				getVenueLocationsByType: getVenueLocationsByType,

				getVenue: getVenue,

				getVenuePhotos: getVenuePhotos,

				getSimilarVenues: getSimilarVenues,

			};

			function getVenueLocationsByType(location){

				return $http.get('https://api.foursquare.com/v2/venues/explore?near=San-Francisco&query=' + location + '&venuePhotos=1&limit=10&radius=10000&client_id=RHV1ZD3K1SPFECIGDWMOXRVQ3TGNQTUGA0QF1K1GQJ0EICIF&client_secret=4RJLQAZNTF2LE4DCSBHJKNC1BBHDUEQBSHIAFCML4GYPXGNQ&v=20140806')
								.then(function(response){
									return response.data.response.groups[0].items;
								})
								.catch(function(error){
									return error;
								});

			}

			function getVenue(venueId){

				return $http.get('https://api.foursquare.com/v2/venues/' + venueId + '/?client_id=RHV1ZD3K1SPFECIGDWMOXRVQ3TGNQTUGA0QF1K1GQJ0EICIF&client_secret=4RJLQAZNTF2LE4DCSBHJKNC1BBHDUEQBSHIAFCML4GYPXGNQ&v=20140806');

			}

			function getVenuePhotos(venueId){

				return $http.get('https://api.foursquare.com/v2/venues/' + venueId + '/photos?client_id=RHV1ZD3K1SPFECIGDWMOXRVQ3TGNQTUGA0QF1K1GQJ0EICIF&client_secret=4RJLQAZNTF2LE4DCSBHJKNC1BBHDUEQBSHIAFCML4GYPXGNQ&v=20140806');
			}

			function getSimilarVenues(venueId){

				return $http.get('https://api.foursquare.com/v2/venues/' + venueId + '/similar?client_id=RHV1ZD3K1SPFECIGDWMOXRVQ3TGNQTUGA0QF1K1GQJ0EICIF&client_secret=4RJLQAZNTF2LE4DCSBHJKNC1BBHDUEQBSHIAFCML4GYPXGNQ&v=20140806');

			}



			return service;

		}



}());