(function(){

	'use strict';

	angular.module('myApp')

		.controller('SearchVenueCtrl', SearchVenueCtrl);

		SearchVenueCtrl.$inject = ['$scope', 'FSDataService','MapService', '$stateParams'];

		function SearchVenueCtrl($scope, FSDataService,MapService, $stateParams){
			
			var vm         = this;

			vm.venues      = [];
			vm.venueFilter = false;
			vm.sortType    = "";
			vm.searchType    = "";
			vm.query = $stateParams.type;
			vm.allMarkers = [];

			vm.actMap = function(lat) {
				for( var i = 0; i < vm.allMarkers.length; i++) {

					if( vm.allMarkers[i]._latlng.lat == lat ) {
		
						vm.allMarkers[i].openPopup();
					}	
				}
			}

			FSDataService.getVenueLocationsByType($stateParams.type)

				.then(function(response) {
					vm.searchName = vm.searchType
					console.log(response);;
					vm.venues = response;

					//Get Map Data 
					MapService.getSearchVenueMap(response);
					vm.allMarkers = MapService.getAllMarkers();
					//show Search Venue Filter
					vm.venueFilter = true;
					vm.searchType = "";
				})
				.catch(function(error){
					console.log(error);
				});
		

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