app.directive('infoTemplate', function () {

    return {
        restrict: 'E',
        templateUrl: 'views/infoTemplate.directive.html',
        scope: false,
        resolve: function($scope){
        	$scope.digest()
        }
    };

});