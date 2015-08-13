describe('Testing', function() {
	
	var $scope,
		$controller,
		$httpBackend,
		SearchVenueCtrl,
		FSDataService,
		MapService;

		beforeEach(function() {
			module('myApp');

			inject(function(_$rootScope_, _$controller_,_$httpBackend_, _FSDataService_, _MapService_) {

				$scope        = _$rootScope_.$new();
				$controller   = _$controller_;
				$httpBackend  = _$httpBackend_;
				FSDataService = _FSDataService_;
				MapService    = _MapService_;

			});

			SearchVenueCtrl = $controller('SearchVenueCtrl', {
				$scope : $scope
			})

			$httpBackend.whenGET('https://api.foursquare.com/v2/venues/explore?near=San-Francisco&query=' + location + '&venuePhotos=1&limit=10&radius=10000&client_id=RHV1ZD3K1SPFECIGDWMOXRVQ3TGNQTUGA0QF1K1GQJ0EICIF&client_secret=4RJLQAZNTF2LE4DCSBHJKNC1BBHDUEQBSHIAFCML4GYPXGNQ&v=20140806').respond({name: "Kirck"});


		});

afterEach(function(){ 
	$httpBackend.verifyNoOutstandingExpectation(); 

	$httpBackend.verifyNoOutstandingRequest(); 
});

		describe('Initialization', function() {
			
			it('should have Search Venue Controller', function() {
				expect(SearchVenueCtrl).toBeDefined();
			});

			it('should have FSDataService', function() {
				expect(FSDataService).toBeDefined();
			});
			it('should have MapService', function() {
				expect(MapService).toBeDefined();
			});

			it('should have model of array of venues', function() {
				expect(SearchVenueCtrl.venues).toEqual([]);
			});	
			it('should have model containing current time', function() {
				expect(SearchVenueCtrl.time).toEqual(new Date().toLocaleTimeString().replace(/:\d+ /, ' '));
			});	
			it('should have model venue filtet set to false', function() {
				expect(SearchVenueCtrl.venueFilter).toBeFalsy();
			});
			it('should have model of sortType set to empty', function() {
				expect(SearchVenueCtrl.sortType).toEqual("");
			});
			it('should have model of location set to empty', function() {
				expect(SearchVenueCtrl.location).toEqual("");
			});
		
			it('should contain duplicate function', function() {
				expect(SearchVenueCtrl.duplicate).toBeDefined();
			});


		});

		describe('User Search', function() {
			it('should allow user to search for a venue', function() {
				expect(SearchVenueCtrl.search).toBeDefined();
			});

			it('should allow user to view  multiple venues', function() {
				$httpBackend.expectGET('https://api.foursquare.com/v2/venues/explore?near=San-Francisco&query=' + SearchVenueCtrl.location + '&venuePhotos=1&limit=10&radius=10000&client_id=RHV1ZD3K1SPFECIGDWMOXRVQ3TGNQTUGA0QF1K1GQJ0EICIF&client_secret=4RJLQAZNTF2LE4DCSBHJKNC1BBHDUEQBSHIAFCML4GYPXGNQ&v=20140806').respond({name:"Kirck"})


				SearchVenueCtrl.search();
			
		

				FSDataService.getVenueLocations(SearchVenueCtrl.location);
				$httpBackend.flush();
				

			});


		
		});



});