app.directive('print', function () {

    return {
        restrict: 'E',
        templateUrl: 'views/print.directive.html',
        scope: {},
        controller: "printCtrl"
        
    };

});