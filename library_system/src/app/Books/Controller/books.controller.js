angular.module('app.books').
controller( 'bookController', ['$scope', '$http', '$location', '$state', '$stateParams', 'bookService', '$rootScope',
    function bookController($scope, $http, $location, $state, $stateParams, bookService, $rootScope) {

        var currenState = $state.current.name;
        $scope.sortType = "lended_book";
        $scope.sortReverse = true;
        $scope.user = $rootScope.globals.authUser;

        if (currenState == "bookList") {
            bookService.bookList($scope);
        } else if (currenState == "bookDetails") {
            bookService.viewBook($scope, $stateParams);
        }

        $scope.approve = function(item) {
            if(confirm("Are you sure?")){
                bookService.approve($scope, item);    
            }
        }

        $scope.returned = function(item) {
            if(confirm("Are you sure?")){
                bookService.returned($scope, item);    
            }
        }
        $scope.lend = function() {
            if(confirm("Are you sure?")){
                bookService.lend($scope);    
            }
        }
        
        $scope.addBook = function() {
            if ($scope.bookForm.$valid) {
                bookService.addBook($scope);
            }
        }
    }
]);