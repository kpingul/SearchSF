(function(){

	'use strict';

	angular.module('myApp')

		.controller('HomeCtrl', HomeCtrl);

		HomeCtrl.$inject = ['$scope'];

		function HomeCtrl($scope){
			
			var vm = this;

			vm.searchRequest = function(query) {
				console.log(query);

			}

		}


}());