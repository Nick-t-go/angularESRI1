'use strict';

window.app = angular.module('angularESRI', ['ui.router', 'esri.map' ]);

app.config(function($urlRouterProvider, $stateProvider){
    $stateProvider
        .state('map',{
            url:'/',
            templateUrl: 'views/map.html',
            controller: 'MapCtrl'
        });

    $urlRouterProvider.otherwise('/');

});