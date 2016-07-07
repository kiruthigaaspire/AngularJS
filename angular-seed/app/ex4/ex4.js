'use strict';

angular.module('myApp.ex4', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/ex4', {
              templateUrl: 'ex4/ex4.html',
              controller: 'Ex4Ctrl'
            }).when('/ex4/:id', {
              templateUrl: 'ex4/ex4.html',
              controller: 'Ex4Ctrl'
            });
          }])
        .controller('Ex4Ctrl', function ($scope, $http, $location, $routeParams) {

          var bookId = $routeParams.id;
          $scope.status = 1;
          var url = 'http://localhost/rest/crud.php';

          if (bookId > 0) {
            $http({
              method: 'post',
              url: url,
              data: {id: bookId, action: 'getBooks'},
              headers: {"Content-Type": "application/json"}
            }).
                    success(function (data, status, headers, config) {
                      $scope.book = data.data;

                    });
          }



          $scope.saveBook = function () {
            $http({
              method: 'post',
              url: url,
              data: {books: $scope.book, action: 'saveBook'},
              headers: {"Content-Type": "application/json"}
            }).
                    success(function (data, status, headers, config) {

                    });
          }

          $scope.addBook = function () {
            $scope.saveBook();
            $location.path('/ex5');
          }


        });
