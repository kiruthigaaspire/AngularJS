var mainApp = angular.module('mainApp', [ 'ngRoute' ]);
mainApp.config(function($routeProvider) {
	$routeProvider
	// route for the home page
	.when('/home', {
		templateUrl : 'Templates/home.html',
		controller: 'mainController'
	})
	// route for the home page
	.when('/twoWayBindingSample', {
		templateUrl : 'Templates/twoWayBinding.html'
	})

	// route for the about page
	.when('/ngControllerSamples', {
		templateUrl : 'Templates/ng-controller.html',
		controller : 'sampleController'
	})

	// route for the contact page
	.when('/ngRepeatSamples', {
		templateUrl : 'Templates/ng-repeat.html',
		controller : 'ngRepeatController'
	})

	// route for the contact page
	.when('/scopeSamples', {
		templateUrl : 'Templates/scopes.html',
		controller : 'scopeController'
	})

	.otherwise({
		redirectTo : '/home'
	});
});

mainApp.controller('sampleController', function($scope) {
	$scope.width = 123;
	$scope.height = 112;
	$scope.names = [ {
		language : 'PHP',
		members : 50
	}, {
		language : 'Mobility',
		members : 20
	}, {
		language : 'Ruby',
		members : 10
	} ];
});

mainApp.controller('ngRepeatController',function($scope) {
	$scope.bookNames = [ {
		"Category" : "Fiction",
		"books" : [ {
			"name" : "Harry Potter and the Order of the Phoenix (Harry Potter, #5)",
			"author" : "J.K. Rowling"
		},
		{
			"name" : "The Hunger Games (The Hunger Games, #1)",
			"author" : "Suzanne Collins"
		} ]
	}, {
		"Category" : "Autobiography",
		"books" : [ {
			"name" : "Autobiography",
			"author" : "Jawaharlal Nehru"
		} ]
	}, {
		"Category" : "Others",
		"books" : [ {
			"name" : "A Passage to India",
			"author" : "E. M. Foster"
		}, {
			"name" : "A week with Gandhi",
			"author" : "L. Fischer"
		} ]
	} ];
});

mainApp.controller('scopeController', function($scope) {
	$scope.name = 'T';
    $scope.counter = $scope.counter1 = 0;
    $scope.message = 'Counter 1 and 2 reached the maximum';
    $scope.$watch('name', function (newValue, oldValue) {
        $scope.counter = newValue;
        $scope.counter1 = $scope.counter1 + 1;
    });
});

mainApp.controller('mainController', function($scope) {
	$scope.message = 'Angula JS - Concepts and examples!';
});

mainApp.controller('directiveController', ['$scope', function($scope) {
	  $scope.copyrightYear = new Date().getFullYear();
	  $scope.copyrightText = '\u00A9 Copyright' + $scope.copyrightYear + '. All Rights Reserved.';
	}]);
mainApp.directive('copyRight', function() {
    var directive = {};
    directive.restrict = 'AME';
    directive.template = '<div>{{copyrightText}}</div>';
    directive.replace = true;
    return directive;
});  
