'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'PotsCtrl'
  });
}])



.controller("PotsCtrl", function($scope, $http, $timeout, $log) {
        $scope.pots = null;
        var getjson = function() {
            //$http.jsonp('http://192.168.1.4/latest?callback=JSON_CALLBACK').
            $http.get('view1/test.json').
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

        $scope.submitData =  function ()
        {
            if (!angular.isDefined($scope.boil)){return;}
            var data = {};
            var whichIsOn = $scope.boil.split("_");
            var whichStatus = whichIsOn[1];
            var whichPot = whichIsOn[0];
            var pot;
            for (pot in $scope.pots){
                if (whichPot == pot) {
                    if (whichStatus == "boil"){
                        data[pot + "_target"] = 300 + $scope.boilRate;
                    }else if (whichStatus == "168"){
                        data[pot + "_target"] = 168;
                    }
                }
                else {
                    data[pot+"_target"] = 0;
                }
            }
            $log.warn($scope.boil);
            $log.warn(data);


        };

        $scope.updateradio = function () {
            $scope.$broadcast('refreshSlider');
            $scope.submitData();
        }

        getjson()

    });

