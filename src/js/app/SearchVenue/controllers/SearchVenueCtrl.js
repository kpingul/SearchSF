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
			vm.location    = "";
			
			vm.search = function(){

				/**
				 * 	 @pre FSData service is called and passed desired user location
				 * 	 
				 *   @post vm venues is set to array of venues
				 */
			
				 FSDataService.getVenueLocations(vm.location)

					.then(function(response){

						
						vm.venues =  response.data.response.groups[0].items;
						
						//Set and Get Map Data 
						MapService.setSearchVenueMap( response.data.response.groups[0].items);
						MapService.getSearchVenueMap();

						//show Search Venue Filter
						vm.venueFilter = true;

					}, function(error){

						return error;

					});


				//empty location input from user 
				vm.location = "";
				
			}

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
			}

		}


}());