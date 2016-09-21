angular.module('app.user').
controller( 'userRegistrationController', ['$scope', '$http', 'userService',
  function userRegistrationController($scope, $http, userService) {
	$scope.regForm = function () {
        userService.regForm($scope);
    }
  }]
);