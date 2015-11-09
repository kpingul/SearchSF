(function(){

	'use strict';

	angular.module('myApp')

		.controller('SearchVenueCtrl', SearchVenueCtrl);

		SearchVenueCtrl.$inject = ['$scope', 'FSDataService','MapService', '$timeout', 'Venues'];

		function SearchVenueCtrl($scope, FSDataService,MapService, $timeout, Venues){
			
			var vm         	= this;
			vm.venues      	= Venues;
			vm.venueFilter 	= true;
			vm.sortType    	= "";
			vm.searchType   = "";
			vm.searchName 	= "";
			vm.venueLimit 	= 5;
			vm.loadMoreVenue = false;
			vm.toggleVenues = false;
			MapService.getSearchVenueMap(Venues);
			vm.allMarkers = MapService.getAllMarkers();
			
			// Returns a duplicate of val 
			//(x) amount of times
			vm.duplicate = function(val, times){
				var str = "",
					i;

				for(i = 0; i < times; i+=1){

					str += val + ' ';

				}
				//return duplicated str (x) times
				return str;
			};

			vm.showMoreVenues = function (){
				if( vm.venues.length == vm.venueLimit ) {
					vm.loadMoreVenue = true;	
				}

				vm.toggleVenues = true; 

				$timeout(function(){
					vm.toggleVenues = false;
					vm.venueLimit += 5;
				}, 450);
			}

		}


}());