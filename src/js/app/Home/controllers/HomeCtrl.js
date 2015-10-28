(function(){

	'use strict';

	angular.module('myApp')

		.controller('HomeCtrl', HomeCtrl);

		HomeCtrl.$inject = ['$scope', '$http'];

		function HomeCtrl($scope, $http){
			
			var vm = this;

			vm.searchRequest = function(query) {
				console.log(query);

			}

		}


}());