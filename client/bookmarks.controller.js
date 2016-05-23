app.controller('bookmarksCtrl', function($scope, $cookies, esriLoader) {

	$scope.$on('map-loaded', function(evt, map){
		esriLoader.require(["esri/geometry/Extent"], function(Extent){

		    if (!$cookies.getObject('DPWGISViewerBookmarks') || $cookies.getObject('DPWGISViewerBookmarks').length === 0) {
		        $scope.bookmarks = [{
		            name: "Long Island",
		            extent: new Extent(map.extent)
		        },
		       	{
		       		name: "Bergen Point", 
		       		extent: new Extent({ xmax:-8163227.7706033075, xmin:-8165436.084123422, ymax: 4964819.747942712, ymin:4963540.622047611,
		       			spatialReference: map.spatialReference})
		       	},
		       	{
		       		name: "Hauppauge Municipal", 
		       		extent: new Extent({ xmax:-8149793.915574392, xmin:-8152002.229094507, ymax:4986731.4085434405, ymin:4985452.282648339,
		       			spatialReference: map.spatialReference})
		       	},
		       	{
		       		name: "335 Yaphank Ave.",
		       		extent: new Extent({ xmin: -8117482.628687667, ymin: 4986602.974688677, xmax: -8116378.471927365, ymax: 4987242.5376363695,
		       			spatialReference: map.spatialReference })
		       	}];

		        $cookies.putObject('DPWGISViewerBookmarks', $scope.bookmarks);
		    } else {
		        $scope.bookmarks = $cookies.getObject('DPWGISViewerBookmarks');
		        $scope.bookmarks.forEach(function(bookmark) {
		            bookmark.extent = new Extent(bookmark.extent);
		        });

		    }


		    $scope.extentFinder = function() {
		        $scope.testExtent = map.extent;
		        $scope.bookmarks.push({ name: $scope.newBookmarkName, extent: map.extent });
		        $scope.newBookmarkName = "";
		        $cookies.putObject('DPWGISViewerBookmarks', $scope.bookmarks);
		    };

		    $scope.removeBookmark = function(index) {
		        $scope.bookmarks.splice(index, 1);
		        $cookies.putObject('DPWGISViewerBookmarks', $scope.bookmarks);
		    };

		    $scope.zoomToExtent = function(newExtent) {
		        $timeout(function(){
		        	map.setExtent(newExtent);
		        });
		    };
		});
	});

});
