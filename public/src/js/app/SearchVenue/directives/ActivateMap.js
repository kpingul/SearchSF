	(function() {

	'use strict';

	angular.module('myApp')

	.directive('activateMap', ['$timeout',
		function($timeout) {

			return {
				restrict: 'A',

				link: function(scope, elem, attrs) {

					elem.on('mouseenter', function(event) {
						for( var i = 0; i < scope.vm.allMarkers.length; i++) {

							if( scope.vm.allMarkers[i]._latlng.lat == attrs.data ) {
				
								scope.vm.allMarkers[i].openPopup();
							}	
						}
					});
				

				}
			};
		}
	]);
}());