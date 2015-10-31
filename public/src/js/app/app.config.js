(function(){
	
	'use strict';

	angular.module('myApp')

		.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

			$urlRouterProvider.when('', '/');

			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'src/js/app/Home/home.tpl.html',
					controller: 'HomeCtrl',
					controllerAs: 'vm'
				})
				.state('main', {
					url: '/search/:type',
					templateUrl: 'src/js/app/SearchVenue/templates/Main.tpl.html',
					controller: 'SearchVenueCtrl',
					controllerAs: 'vm'

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