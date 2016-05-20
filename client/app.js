'use strict';

window.app = angular.module('angularESRI', ['ui.router', 'esri.map','ngCookies' ]);


app.filter('noUSA', function () {
  return function(str1){
	var idx = str1.indexOf(", USA");
	return str1.slice(0, idx);
  };
});

app.config(function($urlRouterProvider, $stateProvider){
    $stateProvider
        .state('map',{
            url:'/',
            templateUrl: './client/views/map.html',
            controller: 'MapCtrl'
        })

        .state('help',{
            url:'/help/:section',
<<<<<<< HEAD
            templateUrl: 'views/help.html',
=======
            templateUrl: './client/views/help.html',
>>>>>>> d6ebb738e5d59985e74e787ef730f9d518f688fb
            controller: 'HelpCtrl'
        });

    $urlRouterProvider.otherwise('/');

});