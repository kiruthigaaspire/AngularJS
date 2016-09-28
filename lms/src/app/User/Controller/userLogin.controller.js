angular.module('app.user').
controller( 'userLoginController', ['$scope', '$http', '$location', '$rootScope', 'userService',
    function userLoginController($scope, $http, $location, $rootScope, userService) {
        $scope.login = function() {
            userService.loginForm($scope);    
        }
    }
  ]
);