(function(){

	'use strict';

	angular.module('myApp')

		.controller('HomeCtrl', HomeCtrl);

		HomeCtrl.$inject = ['$scope', '$timeout', '$state', 'FSDataService', '$q'];

		function HomeCtrl($scope, $timeout, $state, FSDataService, $q){
			
			var vm = this;
			vm.validResponse = true;
			vm.errorResponse = false;


			vm.searchRequest = function(query) {

				FSDataService
					.getVenueLocationsByType(query)
					.then(function( response ) {
	
						vm.validResponse = false;

						if( response.length > 0 ) {
							$timeout(function() {
								vm.validResponse = true;
								$state.transitionTo('main', {type: query});

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