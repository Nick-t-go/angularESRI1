app.directive('relatedDocs', function () {

    return {
        restrict: 'E',
        templateUrl: 'views/relatedDocs.directive.html',
        scope: false,
        resolve: function($scope){
        	$scope.digest()
        }
    };

});