(function(){

	'use strict';

	angular.module('myApp')

		.controller('HomeCtrl', HomeCtrl);

		HomeCtrl.$inject = ['$scope', '$timeout', '$state', 'FSDataService', 'SearchAnalytics', '$window'];

		function HomeCtrl($scope, $timeout, $state, FSDataService, SearchAnalytics, $window){
			
			var vm = this;

			vm.validResponse = true;
			vm.errorResponse = false;
			vm.locationResponse = false;

			vm.searchRequest = function(foodType, location) {

				//location is the object passed that contains
				//the current latitude/longitude of user location
				var lat = location.geometry.location.lat();
				var lng = location.geometry.location.lng();

				//tweaking query to be sent to the server
				//eg: "34.999,-122.233"
				var ll = "" + lat + "," + lng + "";
	
				//Calls SearchAnalytic Service
				//to store the search input
				//into MongoDB for analytics
				SearchAnalytics
					.storeData(foodType)
					.then(function(response) {

					});


				vm.validResponse = false;

				//Calls FSDataService to 
				//validate that the query
				//responds with a 200 repsonse
				FSDataService
					.getVenueLocationsByType(foodType, ll)
					.then(function( response ) {
						
						//checks to see if there are 
						//any venues based on the search
						//term
						if( response.length > 0 ) {
							
							//executes to toggle the valid
							//response in the template 
							//and redirects user to the search
							//venue's main template to display results
							$timeout(function() {
								vm.validResponse = true;

								/*
									redirects user to main and passes
									to the state parameters the foodtype
									search term and latitute/longitude
								*/
								$state.transitionTo('main', {type: foodType, latLng: ll});

							}, 500);
						} else {
							
							//exectues when there are 
							//no search results 
							//returned from server 
							$timeout(function() {

								//shows error response 
								//to user in template
								vm.errorResponse = true;
								vm.validResponse = true;
	
							}, 500);
						}
					});
			
			}

		}


}());