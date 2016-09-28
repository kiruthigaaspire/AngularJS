angular.module('lms.user').
controller('approveUserController',
     function approveUserController($scope, $state, $stateParams, User) {
          $scope.approveUser = User.approveUser({'id': $stateParams.id});
          $state.go('userList');
     }
);
