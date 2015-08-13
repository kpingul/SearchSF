(function(){

	'use strict';

	angular.module('myApp')

		.directive('loadingBar', ['$timeout',  function($timeout){

			return {
				restrict: 'A',


				link: function(scope, elem, attrs){


					var active    	   = "active",
						activeLink     = "activeLink",
						overlay        = ".overlay",
						loadingOverlay = "loadingOverlay",
						spinner        = "#spinner";

					elem.on('click', activate);
					
					function activate(event){

						if(attrs.sort){

							$('li.activeLink').removeClass(activeLink);
							$(overlay).addClass(loadingOverlay);
							$(spinner).addClass(active);

							$timeout( function(){

								scope.vm.sortType =  attrs.sort;
					
								scope.$digest();
								$(spinner).removeClass(active);
								$(overlay).removeClass(loadingOverlay);
								elem.parent().addClass(activeLink);

							}, 800);

						}
					
					

					}


				}
			}

		}]);
}());