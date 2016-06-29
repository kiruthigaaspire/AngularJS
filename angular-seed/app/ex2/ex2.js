'use strict';

angular.module('myApp.ex2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ex2', {
    templateUrl: 'ex2/ex2.html',
    controller: 'Ex2Ctrl'
  });
}])

.controller('Ex2Ctrl', function($scope) {    
  $scope.text1 = '';
  $scope.text2 = '';
  $scope.result = 0;
     $scope.$watchCollection('[text1, text2]', function(inputs) {
      $scope.result = inputs[0].length + inputs[1].length;
    }, true);
});
