app.directive('navbar', function () {

    return {
        restrict: 'E',
        templateUrl: './client/views/navbar.directive.html',
        scope: false,
        resolve: function($scope){
        	$scope.digest();
        }
    };

});