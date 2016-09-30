angular.module('app.books').
controller( 'bookController', ['$scope', '$http', '$location', '$state', '$stateParams', 'bookService', '$rootScope',
    function bookController($scope, $http, $location, $state, $stateParams, bookService, $rootScope) {

        var currenState = $state.current.name;
        $scope.sortType = "lended_book";
        $scope.sortReverse = true;
        $scope.user = $rootScope.globals.authUser;
        if (currenState == "bookList") {
            bookService.bookList($scope);
        } else if (currenState == "myBooks") {
            bookService.mybookList($scope);
        } else if (currenState == "bookDetails") {
            bookService.viewBook($scope, $stateParams);
        } else if (currenState == "editBook") {
            bookService.editBook($scope, $stateParams);
        }
        $scope.lendBook = function(book,user) {
            if(confirm("Please confirm your are lending this "+book.book_name+" book?")){
                bookService.lendBook($scope, book, user);    
            }
        }
        $scope.approveBook = function(book) {
            if(confirm("Please confirm your are Approve this "+book.book_name+" book?")){
                bookService.approveBook($scope, book);    
            }
        }
        $scope.rejectBook = function(book) {
            if(confirm("Please confirm your are Reject this "+book.book_name+" book?")){
                bookService.rejectBook($scope, book);    
            }
        }
        $scope.returnBook = function(book) {
            if(confirm("Please confirm your are Return this "+book.book_name+" book?")){
                bookService.returnBook($scope, book);    
            }
        }
        
        $scope.addBook = function() {
            if ($scope.bookForm.$valid) {
                bookService.addBook($scope);
            }
        }
    }
]);
