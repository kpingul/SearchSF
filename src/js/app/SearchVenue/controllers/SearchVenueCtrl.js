(function(){

	'use strict';

	angular.module('myApp')

		.controller('SearchVenueCtrl', SearchVenueCtrl);

		SearchVenueCtrl.$inject = ['$scope', 'FSDataService','MapService'];

		function SearchVenueCtrl($scope, FSDataService,MapService){
			
			var vm         = this;

			vm.venues      = [];
			vm.time        = new Date().toLocaleTimeString().replace(/:\d+ /, ' ');
			vm.venueFilter = false;
			vm.sortType    = "";
			vm.searchType    = "";
		

			
			vm.search = function(){

				FSDataService.getVenueLocationsByType(vm.searchType)

					.then(function(response) {

						vm.searchName = vm.searchType;
						vm.venues = response;

						//Set and Get Map Data 
						MapService.setSearchVenueMap(response);
						MapService.getSearchVenueMap();

						//show Search Venue Filter
						vm.venueFilter = true;
						vm.searchType = "";
					})
					.catch(function(error){
						console.log(error);
					});
		
			};

			/**
			 * @pre receives value and number of times to duplicate
			 * @post returns a string of value (x) times
			 */
			
			vm.duplicate = function(val, times){
				var str = "",
					i;

				for(i = 0; i < times; i+=1){

					str += val + ' ';

				}
				//return duplicated str (x) times
				return str;
			};

		}


}());