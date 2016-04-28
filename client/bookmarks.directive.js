app.directive('bookmarks', function () {

    return {
        restrict: 'E',
        templateUrl: 'views/bookmarks.directive.html',
        scope: {map:'='},
        controller: 'bookmarksCtrl'
    };

});