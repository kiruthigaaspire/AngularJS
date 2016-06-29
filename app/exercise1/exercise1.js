'use strict';

angular.module('myApp.exercise1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/exercise1', {
    templateUrl: 'exercise1/exercise1.html',
  });
}])