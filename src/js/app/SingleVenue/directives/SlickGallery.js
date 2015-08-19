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

			};

			function link(scope, elem, attrs){
						
				var photos  = [],
				photoMixins = [],
				photoSize   = 'original';

				elem.on('click', function(e) {

					e.preventDefault();

					//activate swipebox with venue photos
					//@params accepts an array of objects
					//with href and title properties
					$.swipebox(photoMixins);

				});

				//Calls the FS Data Service and requests
				//the venue ID and creates a mixin of photo objects
				//to be passed into the swipebox jquery plugin
				FSDataService.getVenuePhotos(attrs.venueid)

					.then( function(response) {

						photos = response.data.response.photos.items;

						return photos;

					}, function(error) {

						return error;

					})

					.then( function(updatedResponse) {
						
						updatedResponse.map( function(item, index) {

							//checks for user information since
							//not all users include a last name or firstName
							if(item.user.lastName){
								photoMixins.push({
									href: item.prefix + photoSize + item.suffix,
									title: item.user.firstName + ' ' + item.user.lastName
								});

							}else{

								photoMixins.push({
									href: item.prefix + photoSize + item.suffix,
									title: item.user.firstName
								});
							}

						});
						
					});

					
				}

				return directive;
		}
	
}());