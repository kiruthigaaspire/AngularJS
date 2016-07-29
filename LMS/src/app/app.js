angular.module('app', [
  'ngResource',
  'templates-app',
  'templates-common',
  'app.book',
  'app.user',
  'app.home'
]).run(function($rootScope) {
	$rootScope.globals = {};
})
.controller('appController', function appController($scope, $location, UserAuth, $state) {
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		if (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) {
			$scope.pageTitle = toState.data.pageTitle;
	    }
	});
	
	$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		if (UserAuth.isAuthenticated()) {
            $state.go(toState, toParams);
            return;
          }
          $state.go("login");
	});
});

