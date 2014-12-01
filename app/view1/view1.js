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
            $http.jsonp('http://192.168.1.4/latest?callback=JSON_CALLBACK', {  ignoreLoadingBar: true
            }).
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
                            //TODO: update boil config status here
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
                data: data
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
                    }
                    data[pot + "_state"] = "control";

                }
                else {
                    data[pot + "_target"] = 0;
                    data[pot + "_state"] = "monitor";
                }
            }
            $log.warn($scope.boil);
            $log.warn(data);
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

