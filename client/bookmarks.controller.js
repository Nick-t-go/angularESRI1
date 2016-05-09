app.controller('bookmarksCtrl', function($scope, $cookies, esriLoader) {

	$scope.$on('map-loaded', function(evt, map){
		esriLoader.require(["esri/geometry/Extent"], function(Extent){

		    if (!$cookies.getObject('test') || $cookies.getObject('test').length === 0) {
		        $scope.bookmarks = [{
		            name: "Long Island",
		            extent: new Extent(map.extent)
		        }];

		        $cookies.putObject('test', $scope.bookmarks);
		    } else {
		        $scope.bookmarks = $cookies.getObject('test');
		        $scope.bookmarks.forEach(function(bookmark) {
		            bookmark.extent = new Extent(bookmark.extent);
		        });

		    }


		    $scope.extentFinder = function() {
		        $scope.testExtent = map.extent;
		        $scope.bookmarks.push({ name: $scope.newBookmarkName, extent: map.extent });
		        $scope.newBookmarkName = "";
		        $cookies.putObject('test', $scope.bookmarks);
		    };

		    $scope.removeBookmark = function(index) {
		        $scope.bookmarks.splice(index, 1);
		        $cookies.putObject('test', $scope.bookmarks);
		    };

		    $scope.zoomToExtent = function(newExtent) {
		        map.setExtent(newExtent);
		    };
		});
	});

});
