angular.module('app.user').
controller( 'logoutController', ['$scope', '$http', '$rootScope', '$location', 'userService',
  function logoutController($scope, $http, $rootScope, $location, userService) {
    userService.logout($scope);
	$scope.login = function() {
        userService.loginForm($scope);    
    }
  }]
);