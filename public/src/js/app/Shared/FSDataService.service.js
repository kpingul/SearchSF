(function(){

	'use strict';

	angular.module('myApp')

		.factory('FSDataService', FSDataService);

		FSDataService.$inject = ['$http'];

		function FSDataService($http){

			var FourSquareService = {

				checkForVenues: checkForVenues,

				getVenueLocationsByType: getVenueLocationsByType,

				getVenue: getVenue,

				getVenuePhotos: getVenuePhotos,

				getSimilarVenues: getSimilarVenues

			};


			return FourSquareService;
	
			function checkForVenues(foodType, ll) {

				//checks for validity of search term
				return $http.get('/api/venues/' + foodType + '/' + ll)
					.then(function( response ){

						//checks if there are available venues 
						//sent back from the server
						if( response.data.response.groups[0].items.length > 0 ) {
							return true;
						} else {
							return false;
						}
					})
					.catch(function(error){
						if(error) {
							return error;
						}
					});

			}			


			function getVenueLocationsByType(foodType, ll){
				return $http.get('/api/venues/' + foodType + '/' + ll)
					.then(function(response){
						if(response) {
							var venues = response.data.response.groups[0].items;
							return venues;
						}
					})
					.catch(function(error){
						if(error) {
							return error;
							
						}
					});

			}

			function getVenue(venueId){

				return $http.get('/api/venue/' + venueId);

			}

			function getVenuePhotos(venueId){

				return $http.get('/api/venue/photos/' + venueId);
			}

			function getSimilarVenues(venueId){

				return $http.get('/api/venue/similar/' + venueId);

			}

		}



}());