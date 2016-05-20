app.directive('print', function () {

    return {
        restrict: 'E',
        templateUrl: './client/views/print.directive.html',
        scope: {},
        controller: "printCtrl"
        
    };

});