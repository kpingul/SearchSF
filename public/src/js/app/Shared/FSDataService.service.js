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

			function getVenueLocationsByType(foodType, ll){
				return $http.get('/api/venues/' + foodType + '/' + ll)
								.then(function(response){
									if(response) {
										var venues = response.data.response.groups[0].items;
										var venueMixin = [];
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



			return service;

		}



}());