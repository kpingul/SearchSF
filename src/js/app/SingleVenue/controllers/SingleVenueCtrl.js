(function(){

	'use strict';

	angular.module('myApp')

		.controller('SingleVenueCtrl', SingleVenueCtrl);

		SingleVenueCtrl.$inject = ['$scope','FSDataService','MapService', '$stateParams','$timeout','slickBreakpoints'];

		function SingleVenueCtrl($scope,FSDataService,MapService, $stateParams, $timeout, slickBreakpoints){

			var vm 		 = this;
			vm.venueID 	 = $stateParams.venueID;
			vm.venue  	 = {};
			vm.reviewLim = 5;
			vm.slickBP 	 = slickBreakpoints.breakpoints;
			vm.toggleLoadMore = true;


			

			FSDataService.getVenue(vm.venueID)
			
				.then(function(response) {

					vm.venue = response.data.response.venue;
					MapService.setVenueMap(vm.venue.location.lat, vm.venue.location.lng, vm.venue.name)

				}, function(error) {

					console.log(error);

				});

			FSDataService.getSimilarVenues(vm.venueID)

				.then(function(response) {

					console.log(response.data.response.similarVenues.items)
				}, function(error) {

					console.log(error);

				});


		}			


}());