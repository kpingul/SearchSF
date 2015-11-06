(function() {

  'use strict';

	angular.module('myApp')

		.controller('SingleVenueCtrl', SingleVenueCtrl);

		SingleVenueCtrl.$inject = ['$scope','MapService','slickBreakpoints', 'SingleVenueData', 'SimilarVenueData', '$state', '$timeout', 'FSDataService'];

		function SingleVenueCtrl($scope,MapService, slickBreakpoints, SingleVenueData, SimilarVenueData, $state,$timeout, FSDataService){
			var vm 		 	 = this;

			//Stores the SingleVenueData Service 
			//implemented in the router 
			vm.venue  	 	 = SingleVenueData;

			//Limit of user reviews in the template
			vm.reviewLim 	 = 5;

			//Slick carousel configuration setup
			vm.slickBP 	 	 = slickBreakpoints.breakpoints;

			vm.similarVenues = SimilarVenueData;

			//business hours
			vm.hours 		 = [];

			//toggles loading indicator 
			vm.toggleReviews = false;

			//Query to send to MapService
			vm.mapVenue = [
				{
					lat: SingleVenueData.location.lat, 
					lng: SingleVenueData.location.lng, 
					title: SingleVenueData.name
				}
			];
			//Call out to MapService to show map
			MapService.getSearchVenueMap(vm.mapVenue);

			vm.viewSimilarVenue = function(venueID){
				//redirects user to current page 
				//but with different venue request
				$state.go('venue', {venueID: venueID});
			};


			vm.loadMoreReviews = function() {

				vm.toggleReviews = true;
				$timeout(function() {
					vm.toggleReviews = false;
					vm.reviewLim += 5;
				}, 800);
				

			}

		}		

}());