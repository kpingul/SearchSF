(function(){

	'use strict';

	angular.module('myApp')

		.directive('venuePhotoGallery', venuePhotoGallery);

		venuePhotoGallery.$inject = ['FSDataService'];

		function venuePhotoGallery(FSDataService){

			var directive = {

				restrict: 'A',

				scope: {

					venueId: "@"
				},

				link: link

			}

			function link(scope, elem, attrs){
						
				var photos  = [],
				photoMixins = [],
				photoSize   = 'original';

				elem.on('click', function(e) {

					e.preventDefault();

					//activate swipebox with venue photos
					$.swipebox(photoMixins);

				});

				
				FSDataService.getVenuePhotos(attrs.venueid)

					.then( function(response) {

						photos = response.data.response.photos.items;


						return photos;

					}, function(error) {

						return error;

					})

					.then( function(response) {
						
						response.map( function(item, index) {

							if(item.user.lastName){

								photoMixins.push({
									href: item.prefix + photoSize + item.suffix,
									title: item.user.firstName + ' ' + item.user.lastName
								})

							}else{

								photoMixins.push({
									href: item.prefix + photoSize + item.suffix,
									title: item.user.firstName
								})
							}

						});
						
					});

					
				}

				return directive;
		}
	
}());