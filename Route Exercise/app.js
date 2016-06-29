var mainApp = angular.module('mainApp', ['ngRoute']);
mainApp.config(function($routeProvider) {
	$routeProvider
	// route for the home page
	.when('/home', {
		templateUrl : 'home.html',
		controller : 'mainController'
	})

	// route for the about page
	.when('/about', {
		templateUrl : 'about.html',
		controller : 'aboutController'
	})

	// route for the contact page
	.when('/contact', {
		templateUrl : 'contact.html',
		controller : 'contactController'
	})
	.otherwise({
		redirectTo: '/home'
	});
});

mainApp.controller('aboutController', function($scope) {
	$scope.message = 'Look! You are in about page.';
});

mainApp.controller('contactController', function($scope) {
	$scope.message = 'This is Contact page';
});
mainApp.controller('mainController', function($scope) {
	$scope.message = 'See the home page!';
});
