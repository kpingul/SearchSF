(function(){

	'use strict';

	angular.module('myApp')

		.controller('HomeCtrl', HomeCtrl);

		HomeCtrl.$inject = ['$scope', '$timeout', '$state', 'FSDataService'];

		function HomeCtrl($scope, $timeout, $state, FSDataService){
			
			var vm = this;
			vm.validResponse = true;

			vm.searchRequest = function(query) {
				vm.validResponse = false;
				vm.errorResponse = false;

				FSDataService
					.getVenueLocationsByType(query)
					.then(function( response ) {
	
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