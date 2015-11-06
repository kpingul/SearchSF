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

				getTopVenues: getTopVenues

			};


			service.topTenVenues = [];

			service.similarVenues = [];

			service.executionCountTopVenues = 1;
			service.executionCountSimilarVenues = 1;

			return service;
			
			function getVenueLocationsByType(foodType, ll){
				return $http
							.get('/api/venues/' + foodType + '/' + ll)
							.then(function(response){
								if(response) {
									var venues = response.data.response.groups[0].items;
									sortSimilarVenues(response.data.response.groups[0].items);
									sortTopVenues(response.data.response.groups[0].items);
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

			function getTopVenues() {

				return service.topTenVenues;
			}

			// function getSimilarVenues() {

			// 	return service.similarVenues;
			// }

			function sortSimilarVenues(venues) {
				
				if( service.executionCountSimilarVenues <= 1 ) {
					for( var i = 0; i < 5; i++ ) {
						service.similarVenues.push(venues[i])
					}
					
				}
				service.executionCountSimilarVenues++;

			}

			function sortTopVenues(venues) {
	
				/* 	**Side Note 
					Replace Similar Venues with own 
					implementation by sorting the data

					why?? Saves an extra request to the server

				*/

				//Execution count makes sure the amount of
				//time this function is executed once
				//or else the top ten results will 
				//be top 20,30,40 ect..
				if( service.executionCountTopVenues <= 1 ) {

					for( var i = 0; i < venues.length; i++ ) {

						for( var j = i + 1; j < venues.length; j++ ){

							if( venues[j].venue.rating > venues[i].venue.rating ) {
								var temp = venues[j];
								venues[j] = venues[i];
								venues[i] = temp;
							} 
						}

					}

					for( var k = 0; k < 10; k++ ) {
						service.topTenVenues.push(venues[k]);
					}

				}

				service.executionCountTopVenues++;

			}


		}



}());