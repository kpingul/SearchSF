(function(){
	
	'use strict';

	angular.module('myApp')

		.run(['$rootScope', function($rootScope) {

			$rootScope.$on('$stateChangeSuccess',function(){
	
				  //quick fix when the broswer initially reloads, it gets
				  //automatically positioned at the top
					$("html, body").animate({ scrollTop: 0 }, 0);
			});


		}]);

}());
