angular.module('app.user').
controller( 'userRegistrationController', ['$scope', '$http', '$location', '$rootScope', 'userService',
    function userRegistrationController($scope, $http, $location, $rootScope, userService) {
        $scope.registration = function() {
            userService.registrationForm($scope);    
        }
    }
  ]
);