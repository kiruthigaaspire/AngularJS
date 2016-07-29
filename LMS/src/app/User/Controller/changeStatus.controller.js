angular.module('app.user').
controller( 'changeStatusController', function ChangeStatusController($scope, $stateParams, $state, User) {
    User.changeStatus({user_id : $stateParams.id});
    $state.go('userManage');
  }
);