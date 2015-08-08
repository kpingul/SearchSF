(function(){

	'use strict';

	angular.module('myApp')

		.directive('viewMoreReviews', viewMoreReviews);

		viewMoreReviews.$inject = ['$timeout'];

		function viewMoreReviews($timeout){

			var directive = {

				restrict: 'A',

				link: link

			}

			function link(scope, elem, attrs){

				var addedLimit 	= 5,
					numOfMs 	= 700;

				elem.on('click', function(event){

					$timeout( function(){

			  			scope.vm.reviewLim += addedLimit;

			  		}, numOfMs);

				});
			}

			return directive;

		}

}());