describe('Home Controller Tests', function() {

    var $scope,
        $controller,
        $httpBackend,
        HomeCtrl,
        FSDataService,
        MapService;

    beforeEach(function() {
        module('myApp');
        var mockData = [1, 2, 3, 4];

        var mockService = {
            getVenueLocationsByType: function(query) {
                var defer = $q.defer();

                defer.resolve([1, 2, 3, 4]);

                return defer.promise;
            }
        }

        inject(function(_$rootScope_, _$controller_, _FSDataService_, _$q_) {

            $scope = _$rootScope_.$new();
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            FSDataService = _FSDataService_;
            $q = _$q_;


            HomeCtrl = $controller('HomeCtrl', {
                $scope: $scope,
                FSDataService: mockService
            })


        });

    });

    it('should have a home ctrl', function() {
        expect(HomeCtrl).toBeDefined();
    });
    it('should have FSDataService', function() {
        expect(FSDataService).toBeDefined();
    });

    it('should have valid response variable', function() {
        expect(HomeCtrl.validResponse).toBeDefined();
        expect(HomeCtrl.validResponse).toBe(true);
    });

    it('should have search request method', function() {
        expect(HomeCtrl.searchRequest).toBeDefined();
    });

    it('should  when search request method is called', function() {

    });


});