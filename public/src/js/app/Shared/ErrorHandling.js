(function() {

	'use strict';

	angular.module('myApp')

	.directive('errorHandling', ['$timeout',
		function($timeout) {

			return {
				restrict: 'A',

				link: function(scope, elem, attrs) {

				}
			
			};
		}
	]);
}());