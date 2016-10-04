angular.module('app.books').
controller( 'bookController', ['$scope', '$http', '$location', '$state', '$stateParams', 'bookService', '$rootScope',
    function bookController($scope, $http, $location, $state, $stateParams, bookService, $rootScope) {

        var ActiveState = $state.current.name;
        $scope.sortType = "lended_book";
        $scope.sortReverse = true;
        $scope.user = $rootScope.globals.authUser;
        if (ActiveState == "bookList") {
            bookService.bookList($scope);
        } else if (ActiveState == "myBooks") {
            bookService.mybookList($scope);
        } else if (ActiveState == "viewBook") {
            bookService.viewBook($scope, $stateParams);
        } else if (ActiveState == "editBook") {
            bookService.editBook($scope, $stateParams);
        } else if (ActiveState == "lendBooks") {
            bookService.lendbookList($scope, $stateParams);
        }
        $scope.lendBook = function(book,user) {
            if(confirm("Are your sure you want to lend this "+book.book_name+" ?")){
                bookService.lendBook($scope, book, user);    
            }
        }
        $scope.approveBook = function(book) {
            if(confirm("Are you sure your want to Approve this "+book.book_name+" ?")){
                bookService.approveBook($scope, book);    
            }
        }
        $scope.rejectBook = function(book) {
            if(confirm("Are you sure your want to Reject this "+book.book_name+" ?")){
                bookService.rejectBook($scope, book);    
            }
        }
        $scope.returnBook = function(book) {
            if(confirm("Are you sure your want to Return this "+book.book_name+" ?")){
                bookService.returnBook($scope, book);    
            }
        }
        $scope.deleteBook = function(book) {
            if(confirm("Are you Sure, you want to delete this "+book.book_name+" ?")){
                bookService.deleteBook($scope, book);    
            }
        }
        $scope.addBook = function() {
            if ($scope.bookForm.$valid) {
                bookService.addBook($scope);
            }
        }
        $scope.updateBook = function() {
            if ($scope.bookForm.$valid) {
                bookService.updateBook($scope);
            }
        }
    }
]);
