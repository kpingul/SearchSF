(function(){

	'use strict';

	angular.module('myApp')

		.directive('venuePhotoGallery', venuePhotoGallery);

		venuePhotoGallery.$inject = ['FSDataService'];

		function venuePhotoGallery(FSDataService){

			var directive = {

				restrict: 'A',

				link: link

			};

			function link(scope, elem, attrs){
		
				elem.on('click', function(e) {
					//activate swipebox with venue photos
					//@params accepts an array of objects
					//with href and title properties
					$.swipebox(scope.vm.venuePhotos);
					

				});

				
					
			}

			return directive;
		}
	
}());