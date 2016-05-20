app.directive('basemapGallery', function () {

    return {
        restrict: 'E',
        templateUrl: './client/views/basemapGallery.directive.html',
        scope: {map:'='},
        controller: 'basemapGalleryCtrl'
    };

});