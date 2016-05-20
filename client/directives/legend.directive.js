app.directive('legendBox', function () {

    return {
        restrict: 'E',
        templateUrl: './client/views/legend.directive.html',
        scope: false,
        resolve: function($scope){
        	$scope.digest();
        }
    };

});