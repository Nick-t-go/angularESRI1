app.directive('search', function () {

    return {
        restrict: 'E',
        templateUrl: './client/views/search.directive.html',
        scope: {map:'='},
        controller: 'searchCtrl'
    };

});