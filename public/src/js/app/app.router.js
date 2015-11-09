(function(){
	
	'use strict';

	angular.module('myApp')

		.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {
			// $locationProvider.html5Mode(true);
			$urlRouterProvider.when('', '/');

			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'src/js/app/Home/templates/home.tpl.html',
					controller: 'HomeCtrl',
					controllerAs: 'vm'
				})
				.state('main', {
					url: '/search/:type/:latLng',
					templateUrl: 'src/js/app/SearchVenue/templates/Main.tpl.html',
					controller: 'SearchVenueCtrl',
					controllerAs: 'vm',
					resolve: {

						Venues: ['$stateParams', 'FSDataService', function( $stateParams, FSDataService ) {
							var type 	= $stateParams.type,
								latLng  =  $stateParams.latLng;

							return FSDataService
								.getVenueLocationsByType(type, latLng)
								.then(function(response) {
									if( response ) {
										return response;
									}
							
								})
								.catch(function(error){
									console.log(error);
								});
						}]

					}

				})
				.state('venue', {
					url: '/venue/:venueID',
					templateUrl: 'src/js/app/SingleVenue/templates/Venue.tpl.html',
					controller: 'SingleVenueCtrl',
					controllerAs: 'vm',
					resolve: {
						
						SingleVenueData: ['$stateParams', 'FSDataService', function($stateParams, FSDataService) {
							var venue   = {},
								venueID = $stateParams.venueID; 
								
							return FSDataService
										.getVenue(venueID)
										.then(function(response) {
											venue = response.data.response.venue;
											return venue;
										})
										.catch(function(error){
											console.log(error);
										});

						}],

						SingleVenuePhotos: ['$stateParams', 'FSDataService', function( $stateParams, FSDataService ) {
							var photoMixins = [],
								photoSize   = 'original';

							//Calls the FS Data Service and requests
							//the venue ID and creates a mixin of photo objects
							//to be passed into the swipebox jquery plugin
							return FSDataService.getVenuePhotos($stateParams.venueID)

								.then( function(response) {

									if( response.data ) {
										return response.data.response.photos.groups[1].items;;
									}
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

									return photoMixins;
									
								});

						}],

						SimilarVenueData: ['$stateParams', 'FSDataService',function($stateParams, FSDataService) {
							var venueID = $stateParams.venueID;
							
							return FSDataService
								 		.getSimilarVenues(venueID)
								 		.then(function(response) {
											return response.data.response.similarVenues.items;
									 	})
									 	.catch(function(error){
									 		return error;
									 	});

						}]
					}
				});


		}]);


}());