'use strict';

angular.module('myApp.control', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/control', {
            templateUrl: 'view1/view1.html',
            controller: 'PotsCtrl'
        });
    }])


    .controller("PotsCtrl", function ($scope, $http, $timeout, $log, $q) {
        var canceller = $q.defer();
        $scope.pots = null;
        var getjson = function () {
            $http.jsonp('http://192.168.1.4/latest?callback=JSON_CALLBACK', {
                ignoreLoadingBar: true
            }).
            //$http.get('view1/test.json').
                success(function (data) {
                    $scope.notresponding = false;
                    $scope.pots = data;
                    var pot;
                    var disabled;
                    for (pot in $scope.pots) {
                        if ($scope.pots[pot].state == "disabled") {
                            disabled = true;
                        }
                        if ($scope.pots[pot].state == "control") {
                            disabled = false;
                            if ($scope.pots[pot].target == 168) {
                                $scope.boil = pot + "_168";
                            }
                            else if ($scope.pots[pot].target >= 300) {
                                $scope.boil = pot + "_boil";
                                $scope.boilRate = $scope.pots[pot].target - 300;
                            }
                            else if ($scope.pots[pot].target == 0) {
                                $scope.boil = pot + "_monitor";
                            } else {
                                $scope.boil = pot + "_custom";
                                $scope.customInput = $scope.pots[pot].target;
                            }
                        }
                        $scope.isDisabled = disabled;
                        }

                }).
                error(function () {
                    $log.warn('failed to retreive json file');
                    $scope.notresponding = true;
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


        function postIt(data){
            $http({
                method: 'POST',
                url: 'http://192.168.1.4/configure',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: data,
                timeout: 10000
            }).
                success(function () {
                    $scope.missedPut = false;
                }).
                error(function () {
                    $scope.missedPut = true;

                })


        }

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
                    } else if (whichStatus == "monitor") {
                        data[pot + "_target"] = 0;
                    } else if (whichStatus == "custom") {
                        data[pot + "_target"] = $scope.customInput;
                    }
                    data[pot + "_state"] = "control";

                }
                else {
                    data[pot + "_target"] = 0;
                    data[pot + "_state"] = "monitor";
                }
            }

            postIt(data);


        };

        $scope.updateradio = function () {
            $scope.$broadcast('refreshSlider');
            $scope.submitData();
        };

        $scope.toggle = function (on) {
            var pot;
            var data = {};
            var state;
            if (on){state = "monitor"}
            else {state = "disabled"}
            for (pot in $scope.pots){
                data[pot + "_target"] = 0;
                data[pot + "_state"] = state;
            }
            $scope.boil = null;
            postIt(data);
        };

        getjson()

    });

