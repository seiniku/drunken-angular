'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'PotsCtrl'
        });
    }])


    .controller("PotsCtrl", function ($scope, $http, $timeout, $log) {
        $scope.pots = null;
        var getjson = function () {
            $http.jsonp('http://192.168.1.4/latest?callback=JSON_CALLBACK').
            //$http.get('view1/test.json').
                success(function (data) {
                    $scope.pots = data;
                    var pot;
                    for ( pot in $scope.pots){
                        if ($scope.pots[pot].state == "disabled"){
                            $scope.isDisabled = true;
                        }
                        else {
                            $scope.isDisabled = false;
                            break;
                        }
                    }
                }).
                error(function () {
                    $log.warn('failed to retreive json file');
                });
            var timer = $timeout(getjson, 2000);
            $scope.$on(
                "$destroy",
                function () {

                    $timeout.cancel(timer);

                }
            );

        };

        //$scope.$watch('boil', function (value) {
        //    $(window).resize();
        //});

        $scope.submitData = function () {
            if (!angular.isDefined($scope.boil)) {
                $log.err("boil is undefined");
                return;
            }
            var data = {};
            var whichIsOn = $scope.boil.split("_");
            var whichStatus = whichIsOn[1];
            var whichPot = whichIsOn[0];
            var pot;
            for (pot in $scope.pots) {
                if (whichPot == pot) {
                    if (whichStatus == "boil") {
                        data[pot + "_target"] = 300 + $scope.boilRate;
                    } else if (whichStatus == "168") {
                        data[pot + "_target"] = 168;
                    }
                }
                else {
                    data[pot + "_target"] = 0;
                }
            }
            $log.warn($scope.boil);
            $log.warn(data);


        };

        $scope.updateradio = function () {
            $scope.$broadcast('refreshSlider');
            $scope.submitData();
        };

        $scope.disableAll = function () {
            var pot;
            var data = {};
            for (pot in $scope.pots){
                data[pot + "_target"] = 0;
                data[pot + "_state"] = "disabled";
            }
            $scope.boil = null;
        };
        getjson()

    });

