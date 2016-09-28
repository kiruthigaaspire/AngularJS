angular.module('lms.user').
controller( 'logoutController', function LogoutController($state, auth) {
    auth.logOut();
});