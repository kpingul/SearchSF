(function(){

	'use strict';

	angular.module('myApp')

		.controller('HomeCtrl', HomeCtrl);

		HomeCtrl.$inject = ['$scope', '$timeout', '$state', 'FSDataService', 'SearchAnalytics'];

		function HomeCtrl($scope, $timeout, $state, FSDataService, SearchAnalytics){
			
			var vm = this;
			vm.validResponse = true;
			vm.errorResponse = false;


			vm.searchRequest = function(foodType, location) {
				var lat = location.geometry.location.lat();
				var lng = location.geometry.location.lng();
				var ll = "" + lat + "," + lng + "";
	
		
				SearchAnalytics
					.storeData(foodType)
					.then(function(response) {

					});

				FSDataService
					.getVenueLocationsByType(foodType, ll)
					.then(function( response ) {
	
						vm.validResponse = false;

						if( response.length > 0 ) {
							$timeout(function() {
								vm.validResponse = true;
								$state.transitionTo('main', {type: foodType, latLng: ll});

							}, 1200);
						} else {
							//throw error message
							$timeout(function() {
								vm.errorResponse = true;
								vm.validResponse = true;
								console.log('error');	
							}, 1200);
						}
					});
				

			}

		}


}());