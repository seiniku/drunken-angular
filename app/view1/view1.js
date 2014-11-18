'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'PotsCtrl'
  });
}])


.controller("PotsCtrl", function($scope, $http) {
  $http.get('view1/test.json').
      success(function(data, status, headers, config) {
        $scope.pots = data;
      }).
      error(function(data, status, headers, config) {
        // log error
      });
        $scope.$watch('boil', function(value){
            $(window).resize();
        });
    });

