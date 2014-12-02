'use strict';
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
    'myApp.control',
    'myApp.graph',
  'myApp.version',
  'vr.directives.slider',
  'angular.filter',
  'angular-loading-bar'
]).
    config(['$routeProvider', '$locationProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: 'control'});
    }]);
