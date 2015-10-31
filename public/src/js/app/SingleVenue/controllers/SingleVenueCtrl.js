(function() {

  'use strict';

	angular.module('myApp')

		.controller('SingleVenueCtrl', SingleVenueCtrl);

		SingleVenueCtrl.$inject = ['$scope','MapService','slickBreakpoints', 'SingleVenueData', 'SimilarVenueData', '$state'];

		function SingleVenueCtrl($scope,MapService, slickBreakpoints, SingleVenueData, SimilarVenueData, $state){
			var vm 		 	 = this;
			vm.venue  	 	 = SingleVenueData;
			vm.reviewLim 	 = 5;
			vm.slickBP 	 	 = slickBreakpoints.breakpoints;
			vm.similarVenues = SimilarVenueData;
			vm.hours 		 = [];
			var hourss = [];

			MapService.setVenueMap(SingleVenueData.location.lat, SingleVenueData.location.lng, SingleVenueData.name);

			vm.viewSimilarVenue = function(venueID){
				$state.go('venue', {venueID: venueID});
			};



		}		




}());