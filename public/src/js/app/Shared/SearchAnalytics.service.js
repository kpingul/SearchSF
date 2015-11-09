(function(){

	'use strict';

	angular.module('myApp')

		.factory('SearchAnalytics', SearchAnalytics);

		SearchAnalytics.$inject = ['$http'];

		function SearchAnalytics ($http) {
			var service = {
				storeData: storeData
			};

			return service;

			function storeData(query) {
				$http
					.post('/api/data', {title: query})
					.then(function (response) {
						
					})
		
			}
		}

}());