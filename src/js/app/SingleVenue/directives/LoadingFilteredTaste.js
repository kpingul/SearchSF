(function(){

	'use strict';

	angular.module('myApp')

		.directive('loadingFilter', ['$timeout',  function($timeout){

			return {

				restrict: 'A',

				link: function (scope, elem, attrs){


					elem.on('click', function(event){
						event.preventDefault();	
				
						var toggle = elem;

			    		if(attrs.loadall){
			  
							$('li.userReviewActiveLinks').removeClass('userReviewActiveLinks');
				 			toggle.button('loading');
					
				    		$timeout(function () {
				    		
								scope.vm.toggleLoadMore = true;
			 					elem.parent().addClass('userReviewActiveLinks');
						        toggle.button('reset');
				    		 	scope.vm.phraseName = "";

						    }, 1000);

			    		}

			    		if(attrs.loadsingle){

							$('li.userReviewActiveLinks').removeClass('userReviewActiveLinks');
			    			toggle.button('loading');


			    		 	$timeout(function () {
			    		 		scope.vm.toggleLoadMore = false;
			    		 		elem.parent().addClass('userReviewActiveLinks');

			   			      	toggle.button('reset');

			    		 		scope.vm.phraseName = attrs.loadsingle.split(" ")[0];

						    }, 1000);;

			    		}
		
					});
				
				}

		    }

		}]);

}());