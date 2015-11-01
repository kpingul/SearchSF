describe('Single Venue Controller Tests', function() {

    var $scope,
        $controller,
        SingleVenueCtrl,
        SingleVenueDataMock,
        SimilarVenueDataMock,
        MapMockService,
        slickBPMock,
        $state;

    beforeEach(function() {
        module('myApp');

        SingleVenueDataMock = {
            name: 'mock',
            location: {
                lat: 100,
                lng: 100
            }
        };

        SimilarVenueDataMock = [{
            name: 'mock1',
            location: {
                lat: 200,
                lng: 200
            }
        }];

        MapMockService = {
            setVenueMap: function() {

            }
        };

        slickBPMock = {breakpoints: []};


        inject(function(_$rootScope_, _$controller_, _$state_) {

            $scope = _$rootScope_.$new();
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            $state = _$state_;


            SingleVenueCtrl = $controller('SingleVenueCtrl', {
                $scope: $scope,
                SingleVenueData: SingleVenueDataMock,
                SimilarVenueData: SimilarVenueDataMock,
                MapService: MapMockService,
                slickBreakpoints: slickBPMock

            })


        });

    });

    it('should contain Single Venue Controller', function() {
        expect(SingleVenueCtrl).toBeDefined();
    });  

    it('should contain declared variables', function() {
        expect(SingleVenueCtrl.reviewLim).toBeDefined();
        expect(SingleVenueCtrl.slickBP).toBeDefined();
        expect(SingleVenueCtrl.similarVenues).toBeDefined();
        expect(SingleVenueCtrl.hours).toBeDefined();

        expect(SingleVenueCtrl.reviewLim).toBe(5);
        expect(SingleVenueCtrl.slickBP).toEqual(slickBPMock.breakpoints);
        expect(SingleVenueCtrl.similarVenues).toEqual(SimilarVenueDataMock);
        expect(SingleVenueCtrl.hours).toEqual([]);


    });
    it('should contain viewSimilarVenue method', function() {
        expect(SingleVenueCtrl.viewSimilarVenue).toBeDefined();
    });

    it('should transition to different state when viewSimilarVenue is invoked', function() {
        spyOn(SingleVenueCtrl, 'viewSimilarVenue').and.callThrough();

        SingleVenueCtrl.viewSimilarVenue();
        expect(SingleVenueCtrl.viewSimilarVenue).toHaveBeenCalled();
        expect(SingleVenueCtrl.viewSimilarVenue).toHaveBeenCalledWith();
        $state.go('venue', {});

    });



});
