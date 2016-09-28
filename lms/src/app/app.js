angular.module('app', [
  'ngResource',
  'templates-app',
  'templates-common',
  'app.user',
  'app.books',
]).run(function($rootScope) {
    $rootScope.globals = {};
}).controller('appController', function appController($scope, $location, $rootScope, $location) {
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $scope.error_messages = "";
        $scope.error_status = "Info";
    });
    
    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        if($rootScope.globals.authUser == undefined){
            //$location.path('login');
            //return;
        }
    });
});

