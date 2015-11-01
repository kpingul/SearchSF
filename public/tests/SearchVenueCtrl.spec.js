describe('Search Venue Controller tests', function() {

	var $scope,
		$rootScope,
		$controller,
		$q,
		$httpBackend,
		SearchVenueCtrl,
		FSDataService,
		MapService,
		mockService,
		mockMapService;

	beforeEach(function() {
		module('myApp');
		FSDataService = {
			getVenueLocationsByType: function(query) {
				var defer = $q.defer();

				defer.resolve({});

				return defer.promise;
			}
		}

		MapService = {
			setSearchVenueMap: function(query) {

			},
			getSearchVenueMap: function() {

			}
		}



		inject(function(_$rootScope_, _$controller_, _$q_) {

			$scope = _$rootScope_.$new();
			$rootScope = _$rootScope_;
			$controller = _$controller_;
			$q = _$q_;

		});

		SearchVenueCtrl = $controller('SearchVenueCtrl', {
			$scope: $scope,
			FSDataService: FSDataService,
			MapService: MapService
		});



	});


	it('should have a search venue ctrl', function() {
		expect(SearchVenueCtrl).toBeDefined();
	});
	it('should have FSDataService defined', function() {
		expect(FSDataService).toBeDefined();
	});
	it('should have MapService defined', function() {
		expect(MapService).toBeDefined();
	});
	it('should have declared ariables', function() {
		expect(SearchVenueCtrl.venues).toBeDefined();
		expect(SearchVenueCtrl.venueFilter).toBeDefined();
		expect(SearchVenueCtrl.sortType).toBeDefined();
		expect(SearchVenueCtrl.searchType).toBeDefined();
	});


	it('should have a duplicate method', function() {
		expect(SearchVenueCtrl.duplicate).toBeDefined();
	});
	it('should return a string when duplicate method is called', function() {
		expect(SearchVenueCtrl.duplicate("test", 1)).toEqual('test ');
	});
	it('should call FSDataService getVenueLocationsByType', function() {

		$rootScope.$apply();
		spyOn(FSDataService, 'getVenueLocationsByType').and.callThrough();
		spyOn(MapService, 'getSearchVenueMap').and.callThrough();
		spyOn(MapService, 'setSearchVenueMap').and.callThrough();
		FSDataService.getVenueLocationsByType({})
		MapService.getSearchVenueMap();
		MapService.setSearchVenueMap();
		expect(FSDataService.getVenueLocationsByType).toHaveBeenCalled();
		expect(SearchVenueCtrl.venues).toEqual({});
		expect(SearchVenueCtrl.venueFilter).toBeTruthy();
		expect(SearchVenueCtrl.sortType).toEqual("");
		expect(SearchVenueCtrl.searchType).toEqual("");

	});

});