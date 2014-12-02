'use strict';

angular.module('myApp.graph', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/graph', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {

}]);