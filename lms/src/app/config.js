angular.module('lms').config( function lmsConfig ( $stateProvider, $urlRouterProvider ) {
     $urlRouterProvider.otherwise( '/login' );
});