app.directive('navbar', function () {

    return {
        restrict: 'E',
        templateUrl: 'views/navbar.directive.html',
        scope: false,
        resolve: function($scope){
        	$scope.digest();
        }
    };

});