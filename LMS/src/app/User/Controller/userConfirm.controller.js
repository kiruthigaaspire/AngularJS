angular.module('app.user').
controller( 'changeStatusController', function ChangeStatusController($scope, $stateParams, $state, User) {
    console.log($stateParams);
    
    User.changeStatus({user_id : $stateParams.id});
    $state.go('userManage');
  }
);