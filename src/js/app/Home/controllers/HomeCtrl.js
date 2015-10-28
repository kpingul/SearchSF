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
				FSDataService
					.getVenueLocationsByType(query)
					.then(function( response ) {
						console.log(response);
						if( response.length > 0 ) {
							vm.validResponse = true;
							$state.transitionTo('main', {type: query});
						} else {
							//throw error message
							vm.validResponse = true;
							console.log('error');	
						}
					});
				

			}

		}


}());