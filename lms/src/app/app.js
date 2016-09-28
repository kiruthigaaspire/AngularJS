angular.module('lms', [
  'ngResource',
  'templates-app',
  'templates-common',
  'lms.book',
  'lms.user',
  'ui.router',
  'ui.bootstrap',
  'angular.filter'
])
.constant('domain', 'http://lms.com/lib/public')
.controller('lmsController', function lmsController($state, $scope, $location, auth, session) { 
  $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
     var OpenStates = ["registration", "bookList", "bookDetails"];
     if (!auth.isLoggedIn()) {
          $scope.authorizedUser = false;
          $scope.userRole =  'Guest';
          $scope.userInfo = {'name': 'Guest !'};
           
          if (OpenStates.indexOf("toState.name")) {
               return;
          } 
       
          $state.go('login');

          // Prevent state change
          event.preventDefault();
      } else {    
          $scope.authorizedUser = true;
          $scope.userInfo = session.getUser();

          if ($scope.userInfo.role == 1 ) {
              $scope.userRole =  'Admin';                
          } else if ($scope.userInfo.role == 2) {
              $scope.userRole =  'User'; 
          }

      }
  });
  
   $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
     if (angular.isDefined(toState) && angular.isDefined(toState.data.pageTitle)) {
          $scope.pageTitle = toState.data.pageTitle;
     }
  });
  
});
