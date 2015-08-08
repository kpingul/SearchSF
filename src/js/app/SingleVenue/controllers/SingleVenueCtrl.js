(function(){

	'use strict';

	angular.module('myApp')

		.controller('SingleVenueCtrl', SingleVenueCtrl);

		SingleVenueCtrl.$inject = ['$scope','FSDataService', '$stateParams','$timeout','slickBreakpoints'];

		function SingleVenueCtrl($scope,FSDataService, $stateParams, $timeout, slickBreakpoints){

			var vm 		 = this;
			vm.venueID 	 = $stateParams.venueID;
			vm.venue  	 = {};
			vm.reviewLim = 5;
			vm.slickBP 	 = slickBreakpoints.breakpoints;


			FSDataService.getVenue(vm.venueID)
			
				.then(function(response) {

					vm.venue = response.data.response.venue;

				}, function(error) {

					console.log(error);

				});

		}			


}());