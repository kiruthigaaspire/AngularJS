angular.module('app.user').
controller( 'userRegistrationController', ['$scope', '$http', '$location','$state', '$stateParams', '$rootScope', 'userService',
    function userRegistrationController($scope, $http, $location, $state, $stateParams, $rootScope, userService) {
    var ActiveState = $state.current.name;
        if(ActiveState == 'userRegistration') {
            $scope.registration = function() {
                userService.registrationForm($scope);    
            }
        } else if(ActiveState == 'userEdit') {
            userService.userEdit($scope,$stateParams);
        }
        $scope.updateUser = function() {
            if ($scope.userForm.$valid) {
                userService.updateUser($scope);
            }
        }
    }
  ]
);