angular.module('lms.user').
controller( 'editUserController', 
     function editUserController($scope, $stateParams, $state, User) {
          User.get({id : $stateParams.id}, function(user) {
               user.name       = user.name;
               user.email      = user.email;
               user.mobile     = parseInt(user.mobile);
               user.status     = parseInt(user.status);

               $scope.user     = user;
          });

          $scope.submitForm = function (isValid) {
               // check to make sure the form is completely valid
               if (isValid) {
                    User.update($scope.user);
                    $state.go('userList');
               }
          };   
     }
);