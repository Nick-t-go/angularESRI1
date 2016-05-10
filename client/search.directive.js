app.directive('search', function () {

    return {
        restrict: 'E',
        templateUrl: 'views/search.directive.html',
        scope: {map:'='},
        controller: 'searchCtrl'
    };

});