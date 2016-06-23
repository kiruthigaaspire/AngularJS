'use strict';

angular.module('myApp.ex1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ex1', {
    templateUrl: 'ex1/ex1.html',
    controller: 'Ex1Ctrl'
  });
}])

.controller('Ex1Ctrl', [function() {

}]);