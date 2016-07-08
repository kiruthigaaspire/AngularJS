'use strict';

angular.module('myApp.exercise3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/exercise3', {
    templateUrl: 'exercise3/bookform.html',
    controller: 'Exercise3Ctrl'
  }).when('/exercise3/list', {
    templateUrl: 'exercise3/booklist.html',
    controller: 'Exercise3ListCtrl'
  }).when('/exercise3/:bookid', {
    templateUrl: 'exercise3/bookform.html',
    controller: 'Exercise3Ctrl'
  });
}])
.directive("copyRights", function() {
    return {
        restrict : "E",
        template : '<p style=" text-align: center;">&copy; 2016&nbsp;<span style="color:#333">exercise.com .</span></p>'
    };
})
.controller('Exercise3Ctrl', ['$scope', '$routeParams', '$http', '$location', function($scope,$routeParams,$http,$location) {
  $scope.book = {};
  $scope.book.status = 1;
  var bookURL = 'http://172.24.144.57:9999/bookrest/';
  var bookId = $routeParams.bookid;
  if (bookId > 0) {
    $http({
      method: 'GET',
      url: bookURL + bookId + '/',
    }).then(function successCallback(response) {
      $scope.book = response.data;
    });
  }
  $scope.saveBook = function () {
    if (bookId > 0) {
      //Update book
      $http({
        method: 'PUT',
        url: bookURL + bookId + '/',
        data: $scope.book,
        headers: {"Content-Type": "application/json"}
      }).then(function successCallback(response) {
        //Success message
        $location.path("/exercise3/list");
      });
    } else {
      //Create new book
      $http({
        method: 'POST',
        url: bookURL,
        data: $scope.book,
        headers: {"Content-Type": "application/json"}
      }).then(function successCallback(response) {
        //Success message
        $location.path("/exercise3/list");
      });
    }
  }
}]).controller('Exercise3ListCtrl', ['$scope', '$routeParams','$http', '$location', function($scope, $routeParams, $http, $location) {
  var bookURL = 'http://172.24.144.57:9999/bookrest/';
  $scope.getBookList = function () {
    $http({
      method: 'GET',
      url: bookURL,
      headers: {"Content-Type": "application/json"}
    }).then(function successCallback(response) {
      $scope.booklist = response.data;
    });
  }
  $scope.deleteBook = function(bookId){
    if (confirm("Are you sure want to delete this Book ?") == true) {
      $http({
        method: 'DELETE',
        url: bookURL + bookId + '/',
        headers: {"Content-Type": "application/json"}
      }).then(function successCallback(response) {
        $scope.getBookList();
      });
    }
  };
}]);