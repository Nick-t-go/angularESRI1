app.directive('messenger', function () {

    return {
        restrict: 'E',
        templateUrl: './client/views/messenger.directive.html',
        scope: {},
        controller: "messengerCtrl"
        
    };

});