'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'PotsCtrl'
  });
}])



.controller("PotsCtrl", function($scope, $http, $timeout, $log) {
        var getjson = function() {
            $http.jsonp('http://192.168.1.4/latest?callback=JSON_CALLBACK').
                success(function(data, status, headers, config) {
                    $scope.pots = data;
                }).
                error(function(data, status, headers, config) {
                    $log.warn('failed to retreive json file');
                });
            var timer = $timeout(getjson, 2000);
            $scope.$on(
                "$destroy",
                function( event ) {

                    $timeout.cancel( timer );

                }
            );

        }

        $scope.$watch('boil', function(value){
            $(window).resize();
        });
        getjson()

    });

