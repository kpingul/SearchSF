(function(){
	
	'use strict';

	angular.module('myApp')

		.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

			$urlRouterProvider.when('', '/');

			$stateProvider
				.state('main', {
					url: '/',
					templateUrl: 'src/js/app/SearchVenue/templates/Main.tpl.html',
					controller: 'SearchVenueCtrl',
					controllerAs: 'vm'

				})
				.state('venue', {
					url: '/:venueID',
					templateUrl: 'src/js/app/SingleVenue/templates/Venue.tpl.html',
					controller: 'SingleVenueCtrl',
					controllerAs: 'vm'
				})


		}])


}());