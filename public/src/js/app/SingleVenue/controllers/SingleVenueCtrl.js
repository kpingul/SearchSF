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
			vm.mapVenue = [
				{
					lat: SingleVenueData.location.lat, 
					lng: SingleVenueData.location.lng, 
					title: SingleVenueData.name
				}
			]
			MapService.getSearchVenueMap(vm.mapVenue);

			vm.viewSimilarVenue = function(venueID){
				$state.go('venue', {venueID: venueID});
			};

		}		

}());