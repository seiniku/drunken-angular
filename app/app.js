'use strict';
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'vr.directives.slider',
  'angular.filter',
  'angular-loading-bar'
]).
config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
      //$locationProvider.html5Mode(true);


      $routeProvider.otherwise({redirectTo: 'view1'});
    }]);
