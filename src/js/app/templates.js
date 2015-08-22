angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("SearchVenue/templates/Main.tpl.html","<div id=spinner><span id=first class=ball></span> <span id=second class=ball></span> <span id=third class=ball></span></div><div class=\"container-fluid overlay\"><div class=row><div class=\"col-xs-12 col-sm-6 col-md-6\"><div class=input-group><form ng-submit=vm.search()><input type=text ng-model=vm.searchType placeholder=\"Have a craving here in San Francisco? Type it here...\" required> <button class=\"btn btn-default btn-sm\" type=submit loading-bar>Search</button></form></div><div class=SearchVenueFilterContainer><h4 ng-if=vm.venueFilter><p><small>Search Results for <strong>{{vm.searchName | uppercase}}</strong> near<strong>San Francisco, CA</strong></small></p><button class=\"btn btn-default btn-md\" type=button data-toggle=collapse data-target=#collapseExample aria-expanded=false aria-controls=collapseExample drop-down>Show Filters</button></h4><div class=collapse id=collapseExample><div class=\"well clearfix\"><div class=dropDownSearchList><h5><strong>SortBy</strong></h5><ul class=innerDropDownSearchList><li><a href loading-bar sort=-venue.rating>Best Match</a></li><li><a href loading-bar sort=-venue.rating>Highest Rated</a></li><li><a href loading-bar sort=venue.rating>Lowest Rated</a></li></ul></div><div class=dropDownSearchList><h5><strong>Price</strong></h5><ul class=innerDropDownSearchList><li><a href loading-bar sort=-venue.price.tier>Most Expensive</a></li><li><a href loading-bar sort=venue.price.tier>Least Expensive</a></li></ul></div></div></div></div><ul class=searchVenueList><li ng-repeat=\"venue in vm.venues | orderBy: vm.sortType track by $index\"><div class=media><div class=\"media-left SearchVenuePhotoContainer\"><a ui-sref=\"venue({venueID: venue.venue.id})\"><img class=\"media-object SearchVenuePhoto\" src={{venue.venue.photos.groups[0].items[0].prefix}}300x300{{venue.venue.photos.groups[0].items[0].suffix}} alt=...></a></div><div class=\"media-body searchVenueBody\"><p><span class=searchVenueIndex>{{$index + 1}}</span>. <span class=searchVenueRating>{{venue.venue.rating}}</span></p><h4 class=media-heading><a ui-sref=\"venue({venueID: venue.venue.id})\">{{venue.venue.name}}</a></h4><strong>{{vm.duplicate(venue.venue.price.currency, venue.venue.price.tier)}}</strong> &middot; {{venue.venue.categories[0].name}}<br>{{venue.venue.hours.status}}</div><div class=\"media-right searchVenueAddressContainer\"><address class=searchVenueAddress>{{venue.venue.location.address}}<br>{{venue.venue.location.city}},{{venue.venue.location.state}}<br>{{venue.venue.contact.formattedPhone}}</address></div></div><div class=media style=\"line-height: 1em\"><img class=SearchVenueUserPhoto src={{venue.tips[0].user.photo.prefix}}300x300{{venue.tips[0].user.photo.suffix}} alt> <span class=searhVenueUserTip>{{venue.tips[0].text}}</span></div></li></ul></div><div class=\"col-xs-12 col-sm-6 col-md-6\"><div id=mapCanvas style=\"width: 100%; height: 45em\"></div></div></div></div>");
$templateCache.put("SingleVenue/templates/Venue.tpl.html","<div class=\"container VenueContainer\"><div class=row><slick arrows=true speed=300 slides-to-show=5 touch-move=false slides-to-scroll=1 data=vm.venue.photos.groups[0].items init-onload=true responsive=vm.slickBP><div ng-repeat=\"photo in ::vm.venue.photos.groups[0].items\"><div class=img-wrap><img class=img-responsive src={{::photo.prefix}}300x300{{::photo.suffix}} alt><div class=img-info><h4><strong>{{::photo.user.firstName}} {{::photo.user.lastName}}</strong></h4><p>on {{::photo.createdAt | timefilter}}</p></div></div></div></slick><h4 class=text-center><a href=# venue-photo-gallery venueid={{vm.venue.id}}>See all photos</a></h4></div><div class=row><div class=col-md-8><div class=\"panel panel-default\"><div class=panel-body style=\"padding: 0; padding: 0px 20px\"><span class=addressName><h1>{{::vm.venue.name}}</h1><p>{{::vm.venue.categories[0].name}} &middot; {{::vm.venue.categories[1].name}}</p></span><address class=businessInformationContainer><strong><span class=businessRating>{{::vm.venue.rating}}</span> Based on {{::vm.venue.ratingSignals}} ratings</strong><p></p><strong>{{::vm.venue.location.address}}<br>{{::vm.venue.location.city}}, {{::vm.venue.location.state}} {{::vm.venue.location.postalCode}}</strong><br><span class=\"glyphicon glyphicon-earphone\"></span>{{::vm.venue.contact.formattedPhone}}<br><span class=\"glyphicon glyphicon-new-window\"></span> <a href={{::vm.venue.url}}>{{::vm.venue.name | lowercase}}</a></address><address class=businessMenu><span><b>Hours</b>: <strong ng-class=\"{closedVenue : vm.venue.hours.isOpen == false, openVenue : vm.venue.hours.isOpen == true}\">{{::vm.venue.hours.status}}</strong></span> <span><b>Price:</b> <strong class=pricing>{{::vm.venue.attributes.groups[0].summary}}</strong> {{::vm.venue.price.message}}</span> <span ng-repeat=\"menu in vm.venue.attributes.groups | menufilter\"><span ng-if=\"menu.name === \'Menus\'\"><b>Menu</b> <strong class=\"glyphicon glyphicon-cutlery\"></strong> : {{menu.summary}} <a href={{vm.venue.menu.url}}><small>(View Menu)</small></a></span> <span ng-if=\"menu.name === \'Drinks\'\"><b>Drinks</b>: {{menu.summary}}</span></span> <span><b>Visits</b> &middot; {{::vm.venue.stats.visitsCount}}</span> <span><b>Checkins</b>&middot; {{::vm.venue.stats.checkinsCount}}</span></address></div></div></div><div class=\"col-md-4 pull-right\"><div id=venue-canvas style=\"width: 100%; height: 20em\"></div></div></div><div class=row><div class=col-md-9><h2>Recommended Reviews</h2><div class=\"panel panel-default\"><div class=panel-body><span class=\"userReviewTotalLength userReviewBody\"><b>{{::vm.venue.tips.groups[0].items.length}} tips and reviews</b></span> <span class=\"float-right userReviewBody\"><span><b>Sort</b>|</span> <span><a href ng-click=\"vm.sortType = \'-createdAt\'\">Recent |</a></span> <span><a href ng-click=\"vm.sortType = \'-likes.count\'\">Popular</a></span></span></div></div><ul class=userReviewList><li ng-repeat=\"user in vm.venue.tips.groups[0].items | filter: vm.phraseName| orderBy: vm.sortType | limitTo: vm.reviewLim\"><div class=media><div class=media-left><img class=\"media-object userReviewThumbnails\" src={{user.user.photo.prefix}}300x300{{user.user.photo.suffix}}></div><div class=media-body><h5 class=media-heading>{{user.text}}</h5><small class=text-muted>{{user.user.firstName}} {{user.user.lastName}} <strong>&middot;</strong> {{user.createdAt | timefilter}} <strong>&middot;</strong> <span class=\"glyphicon glyphicon-heart\" style=\"font-size: 0.9em\"></span> {{user.likes.count}} likes</small></div></div></li><center><button ng-disabled=\"vm.reviewLim === vm.venue.tips.groups[0].items.length\" view-more-reviews>View More</button><center></center></center></ul></div><div class=col-md-3><div class=\"panel panel-default\"><div class=panel-heading><strong class=businessHoursTitle>More Business Info</strong></div><div class=panel-body><ul class=businessInformationList><li ng-repeat=\"info in ::vm.venue.attributes.groups\">{{::info.items[0].displayName}} - <strong>{{::info.items[0].displayValue}}</strong></li></ul></div></div><h5><strong>You May Also Like</strong></h5><div class=similarVenueContainer ng-repeat=\"(index, similarVenue) in vm.similarVenues track by $index\" ng-click=vm.viewSimilarVenue(vm.similarVenues[index].id)><address style=\"line-height: 1.1\"><a class=similarVenueContainerLink href={{similarVenue.url}}><img class=pull-left src={{similarVenue.categories[0].icon.prefix}}bg_64{{similarVenue.categories[0].icon.suffix}}><h5><a href={{similarVenue.url}}>{{similarVenue.name}}</a></h5><p>{{similarVenue.categories[0].shortName}}</p><small>{{similarVenue.location.address}} ({{similarVenue.location.crossStreet}})</small></a></address></div></div></div></div>");}]);