(function(){

	'use strict';

	angular.module('myApp')

		.controller('HomeCtrl', HomeCtrl);

		HomeCtrl.$inject = ['$scope', '$timeout', '$state'];

		function HomeCtrl($scope, $timeout, $state){
			
			var vm = this;
			vm.validResponse = false;

			vm.searchRequest = function(query) {
				vm.validResponse = true;
				$timeout(function() {
					vm.validResponse = false;
					$state.transitionTo('main', {type: query});
				}, 2000);

			}

		}


}());