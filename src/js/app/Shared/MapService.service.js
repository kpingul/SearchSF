(function(){

	'use strict';

	angular.module('myApp')

		.factory('MapService', MapService);

		function MapService(){

			//**	Can Replace in directive because of  
			//		map canvas dom manipulation
			//**	instead of service 

			var mapService = {

				setSearchVenueMap: setSearchVenueMap,

				setVenueMap: setVenueMap,

				getSearchVenueMap: loadSearchVenuesMap


			};

			var venueInformation = [];

			function setSearchVenueMap(venue){

				venueInformation = [];

				venue.map( function( item, index){

					venueInformation.push({

						title: item.venue.name,
						lat: item.venue.location.lat,
						lng: item.venue.location.lng	

					});

				});

			}

			function loadSearchVenuesMap() {

		        var mapOptions = {

		            center: new google.maps.LatLng(venueInformation[0].lat, venueInformation[0].lng),

		            zoom: 12,

		            mapTypeId: google.maps.MapTypeId.ROADMAP

		        };

		        var map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);
		 

		        var infoWindow = new google.maps.InfoWindow();
		 
		        for (var i = 0; i < venueInformation.length; i++) {

		            var data = venueInformation[i];

		            var myLatlng = new google.maps.LatLng(data.lat, data.lng);

		            var marker = new google.maps.Marker({
		                position: myLatlng,
		                map: map,
		                title: data.title
		            });
		 
		            //Attach click event to the marker.
		            (function (marker, data) {
		                google.maps.event.addListener(marker, "click", function (e) {
		                    //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
		                    infoWindow.setContent("<div style = 'width:80px;min-height:20px'>" + data.title + "</div>");
		                    infoWindow.open(map, marker);
		                });
		           	 })(marker, data);
		        }
		    }


		    function setVenueMap(lat, lng, venueName){
		    	initialize(lat, lng, venueName);
		    }


		    function initialize(lat, lng, venueName) {
	
					var myLatlng = new google.maps.LatLng(lat,lng);

			        var mapOptions = {

			          center: myLatlng,

			          zoom: 17
			        };

			        var map = new google.maps.Map(document.getElementById("venue-canvas"), mapOptions);


			
		

				    var marker = new google.maps.Marker({
				       position: myLatlng,
				       map: map,

					});

					var infowindow = new google.maps.InfoWindow({
					  content: venueName
					  });

					infowindow.open(map,marker);
					 
				}

		


			return mapService;
		}


}());