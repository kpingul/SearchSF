	(function() {

	'use strict';

	angular.module('myApp')

	.directive('activateMap', function() {
			return {
				restrict: 'A',

				link: function(scope, elem, attrs) {

					elem.on('mouseenter', handleMouseEvent);

					function handleMouseEvent(event) {

						//inherits from the search venue controller
						//iterates through the markers and 
						//invokes the popup method when an element 
						//triggers a mouseenter event
						for( var i = 0; i < scope.vm.allMarkers.length; i++) {

							//attrs.data contains the latitude for comparison
							//between the marker and the element that is bound
							//to the mouseover event
							if( scope.vm.allMarkers[i]._latlng.lat == attrs.data ) {
				
								scope.vm.allMarkers[i].openPopup();
							}	
						}
					}
				

				}
			};
		}
	);
}());