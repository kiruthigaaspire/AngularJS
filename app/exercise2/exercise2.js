'use strict';

angular.module('myApp.exercise2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/exercise2', {
    templateUrl: 'exercise2/exercise2.html',
    controller: 'Exercise2Ctrl'
  });
}])
.controller('Exercise2Ctrl', ['$scope', function($scope) {
	$scope.boxHeight = 50;
	$scope.boxWidth = 50;
	$scope.result = '';
	$scope.$watch('boxHeight', function(inputs) {
        $scope.result = inputs.length;
    });
}]);