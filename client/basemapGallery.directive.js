app.directive('basemapGallery', function () {

    return {
        restrict: 'E',
        templateUrl: 'views/basemapGallery.directive.html',
        scope: {map:'='},
        controller: 'basemapGalleryCtrl'
    };

});