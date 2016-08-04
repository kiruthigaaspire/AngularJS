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
.controller('appController', function appController($scope, $rootScope, $location, UserAuth, $state) {
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		if (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) {
			$scope.pageTitle = toState.data.pageTitle;
	    }
	});
	
	$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
	    if (angular.isDefined(toState.data) && angular.isDefined(toState.data.authenticatedUser)) {
	        if (toState.data.authenticatedUser) {
	            if (UserAuth.isAuthenticated()) {
	                if ((toState.data.userRole == 'admin' && $rootScope.globals.currentUser.username == 'admin') || toState.data.userRole == 'user') {
	                    $state.go(toState, toParams);
	                    return;
	                } else {
	                    event.preventDefault();
	                }
	            } else {
	                $state.go('login');
	            }
	        } else {
	            $state.go(toState, toParams);
                return;
	        }
	    }
	});
});

