angular.module('app.user').
controller( 'logoutController', function LogoutController($scope, $state, UserAuth) {
    UserAuth.ClearCredentials();
    $state.go('login');
});
