angular.module('app.user').
controller( 'userLogOffController', ['$scope', '$http', '$location', '$rootScope', 'userService',
    function userLogOffController($scope, $http, $location, $rootScope, userService) {
        console.log('dddd');
        userService.logout($scope);
        $scope.login = function() {
            userService.loginForm($scope);    
        }
    }
  ]
);