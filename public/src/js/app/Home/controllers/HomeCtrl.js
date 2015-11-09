(function(){

	'use strict';

	angular.module('myApp')

		.controller('HomeCtrl', HomeCtrl);

		HomeCtrl.$inject = ['$scope', '$timeout', '$state', 'FSDataService', 'SearchAnalytics', '$window', '$http'];

		function HomeCtrl($scope, $timeout, $state, FSDataService, SearchAnalytics, $window, $http){
			
			var vm = this;

			vm.validResponse = true;
			vm.errorResponse = false;

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
				SearchAnalytics.storeData(foodType);

				vm.validResponse = false;

				//Calls FSDataService to 
				//validate available venue
				//results based on search terms
				FSDataService
					.checkForVenues(foodType, ll)
					.then(function (response) {
						if( response ) {						
								vm.validResponse = true;

								/*
									redirects user to main and passes
									to the state parameters the foodtype
									search term and latitute/longitude
								*/
								$state.transitionTo('main', {type: foodType, latLng: ll});

						} else {
								//shows error response 
								//to user in template
								vm.errorResponse = true;
								vm.validResponse = true;
	

						}
					});
				
			
			}

		}


}());

