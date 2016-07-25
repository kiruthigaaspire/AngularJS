angular.module('app.user').
controller( 'changeStatusController', function ChangeStatusController($stateParams, $scope, $state, User) {
    User.changeStatus({user_id : $stateParams.id});
    $state.go('userManage');
  }
);