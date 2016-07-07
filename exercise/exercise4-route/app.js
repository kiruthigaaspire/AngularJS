var mainApp = angular.module("mainApp", [ 'ngRoute' ]);

mainApp.config(function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl : 'home.html',
        controller : 'booksController'
    }).when('/viewBooks', {
        templateUrl : 'viewBooks.html',
        controller : 'booksController'
    }).otherwise({
        redirectTo : '/home'
    });
});

mainApp.controller('booksController', function($scope) {
    $scope.books = [ {
        name : 'Programing in C',
        author : 'Jason W'
    }, {
        name : 'Java Tutorials',
        author : 'Luke William'
    }, {
        name : 'Modern PHP',
        author : 'Jash'
    } ];

    $scope.message = "Books list.";
});