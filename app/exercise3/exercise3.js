'use strict';

angular.module('myApp.exercise3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/exercise3', {
    templateUrl: 'exercise3/exercise3.html',
    controller: 'Exercise3Ctrl'
  });
}])
.directive("copyRights", function() {
    return {
        restrict : "E",
        template : '<p style=" text-align: center;">&copy; 2016&nbsp;<span style="color:#333">exercise.com .</span></p>'
    };
})
.controller('Exercise3Ctrl', ['$scope', function($scope) {
}]);