(function(){

	'use strict';

	angular.module('myApp')

		.controller('SingleVenueCtrl', SingleVenueCtrl);

		SingleVenueCtrl.$inject = ['$scope','MapService','slickBreakpoints', 'SingleVenueData'];

		function SingleVenueCtrl($scope,MapService, slickBreakpoints, SingleVenueData){

			var vm 		 = this;
			vm.venue  	 = SingleVenueData;
			vm.reviewLim = 5;
			vm.slickBP 	 = slickBreakpoints.breakpoints;

			MapService.setVenueMap(SingleVenueData.location.lat, SingleVenueData.location.lng, SingleVenueData.name);




		}		




}());