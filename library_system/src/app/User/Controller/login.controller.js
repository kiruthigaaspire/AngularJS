angular.module('app.user').
controller( 'loginController', ['$scope', '$http', '$location', '$rootScope', 'userService',
    function loginController($scope, $http, $location, $rootScope, userService) {
        $scope.login = function() {
            userService.loginForm($scope);    
        }
    }
  ]
);