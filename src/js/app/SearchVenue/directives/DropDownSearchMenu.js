(function(){

	'use strict';

	angular.module('myApp')

		.directive('dropDown', function(){

			return {
				restrict: 'A',

				link: function(scope, elem, attrs){

					elem.on('click', function(event){
		
						$('.collapse').collapse();

					});


				}
			}

		});
}());