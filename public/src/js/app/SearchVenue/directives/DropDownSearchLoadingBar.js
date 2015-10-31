(function(){

	'use strict';

	angular.module('myApp')

		.directive('loadingBar', ['$timeout',  function($timeout){

			return {
				restrict: 'A',


				link: function(scope, elem, attrs){


					var active    	   = "active",
						activeLink     = "activeLink",
						loadingOverlay = "loadingOverlay",
						spinner        = "#spinner";

					elem.on('click', activate);
					
					function activate(event){

						if(attrs.sort){

							$('li.activeLink').removeClass(activeLink);
					
							$(spinner).addClass(active);

							$timeout( function(){

								scope.vm.sortType =  attrs.sort;
					
								scope.$digest();
								$(spinner).removeClass(active);
								elem.parent().addClass(activeLink);

							}, 800);

						}


							$(overlay).addClass(loadingOverlay);
							$(spinner).addClass(active);

							$timeout( function(){

								$(spinner).removeClass(active);
								$(overlay).removeClass(loadingOverlay);

							}, 800);

					
					

					}


				}
			};

		}]);
}());