app.directive('messenger', function () {

    return {
        restrict: 'E',
        templateUrl: 'views/messenger.directive.html',
        scope: {},
        controller: "messengerCtrl"
        
    };

});