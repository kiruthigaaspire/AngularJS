angular.module('app', [
  'ngResource',
  'templates-app',
  'templates-common',
  'app.book',
  'app.login'
]).controller('appController', function appController($scope, $location) {
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		if (angular.isDefined(toState.data.pageTitle)) {
			$scope.pageTitle = toState.data.pageTitle;
	    }
	});
});

