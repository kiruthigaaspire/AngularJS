angular.module('lms.user').
controller('deleteUserController',
     function deleteUserController($scope, $state,  $stateParams, User) {
          var deleteUser = confirm('Are you sure you want to delete this User?');
          if (deleteUser) {
              $scope.users = User.delete({id : $stateParams.id});                  
          }

          $state.go('userList');
     }
);
