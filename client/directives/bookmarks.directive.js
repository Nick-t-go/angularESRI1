app.directive('bookmarks', function () {

    return {
        restrict: 'E',
        templateUrl: './client/views/bookmarks.directive.html',
        scope: {map:'='},
        controller: 'bookmarksCtrl'
    };

});