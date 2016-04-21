app.directive('bottomSheet', function () {

    return {
        restrict: 'E',
        templateUrl: 'views/bottomSheet.directive.html',
        scope: false,
        resolve: function($scope){
        	$scope.digest()
        }
    };

});