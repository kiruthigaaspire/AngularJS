angular.module('app.books').factory('bookService', ['$http', '$rootScope', 'apiServices', '$location', function ($http, $rootScope, apiServices, $location) {
    return {
        bookList: function($scope) {
            if($rootScope.globals.authUser != undefined) {
                data = {
                        'user_id' :  $rootScope.globals.authUser.user_id
                };                
                apiServices.process("post", "bookList", data).then(function(response){
                    $scope.bookList = response.book;
            });
            } else {
                $location.path('/login');
            }
        }, 
        mybookList: function($scope) {
            if($rootScope.globals.authUser != undefined) {
                data = {
                        'user_id' :  $rootScope.globals.authUser.id
                };
                apiServices.process("post", "mybookList", data).then(function(response){
                    $scope.bookList = response.book;
              
                });
            } else {
                $location.path('/login');
            }
        }, 
        waitingBookList: function($scope) {
            if($rootScope.globals.authUser != undefined) {
                data = { };
                apiServices.process("post", "waitingBookList", data).then(function(response){
                    $scope.bookList = response.book;
              
                });
            } else {
                $location.path('/login');
            }
        }, 
        lendbookList: function($scope) {
            data = { };
            if($rootScope.globals.authUser != undefined) {
                apiServices.process("post", "lendbookList", data).then(function(response){
                    $scope.bookList = response.book;
                });
            } else {
                $location.path('/login');
            }
        }, 
        editBook: function($scope, param) {
            data = {
                'id' : param.id
            };
            if($rootScope.globals.authUser != undefined) {
                apiServices.process("post", "bookEdit", data).then(function(response){
                $scope.bookData = response;
                });
            } else {
                $location.path('/login');
            }
        },
        viewBook: function($scope, param) {
            data = {
                'id' : param.id
            };
            apiServices.process("post", "bookView", data).then(function(response){
                $scope.bookData = response;
            });
        },
        lendBook: function($scope, book, user) {
            data = {
                'book_id' : book.id,
                'user_id' : user.id
            };
            
            apiServices.process("post", "bookLend", data).then(function(response){
                if(response.errorMessage == "Ok") {
                    $scope.bookList = response.book;
                    $location.path('/myBooks');
                }
            });
        },
        approveBook: function($scope, book) {
            data = {
                'book_id' : book.id,
                'user_id' : book.user_id
            };
            
            apiServices.process("post", "bookApprove", data).then(function(response){
                    $scope.error_status = response.errorStatus;
                    $scope.error_messages = 'Book Approved Successfully';
                    $scope.bookList = response.book;
            });
        },
        rejectBook: function($scope, book) {
            data = {
                    'book_id' : book.id,
                    'user_id' : book.user_id
                };
            
            apiServices.process("post", "bookReject", data).then(function(response){
                $scope.error_status = response.errorStatus;
                $scope.error_messages = 'Book Rejected Successfully';
                $scope.bookList = response.book;
                
            });
        },
        returnBook: function($scope, book) {
            data = {
                    'book_id' : book.id,
                    'user_id' : book.user_id
                };
            apiServices.process("post", "bookReturn", data).then(function(response){
                $scope.error_status = response.errorStatus;
                $scope.error_messages = 'Book Returned Successfully';
                $scope.bookList = response.data;
                
            });
        },
        deleteBook: function($scope, book) {
            data = {
                    'book_id' : book.id
                };
            
            apiServices.process("post", "bookDelete", data).then(function(response){
                $scope.error_status = response.errorStatus;
                $scope.error_messages = 'Book Delete Successfully';
                $scope.bookList = response.book;
                
            });
        },
        addBook: function($scope) {
            data = {
                'book_name' : $scope.bName,
                'author_name' : $scope.bAuthorName,
                'book_code' : $scope.bCode,
                'price' : $scope.bPrice,
                'rack_no' : $scope.bRackNumber,
            };
            if ($rootScope.globals.authUser.isAdmin) {
                apiServices.process("post", "bookAdd", data).then(function(response){
                    if(response.errorStatus == false) {
                        $scope.bName = '';
                        $scope.bAuthorName = '';
                        $scope.bCode = '';
                        $scope.bPrice = '';
                        $scope.bRackNumber = '';
                        $scope.error_status = response.errorStatus;
                        $scope.error_messages = response.errorMessage;
                    }
                });
            } else {
                $location.path('/login');
            }
        },
        updateBook: function($scope) {
            data = {
                'book_name' : $scope.bookData.book_name,
                'author_name' : $scope.bookData.author_name,
                'book_code' : $scope.bookData.book_code,
                'number_of_books' : $scope.bookData.no_of_books,
                'price' : $scope.bookData.price,
                'rack_no' : $scope.bookData.rack_no,
                'book_id' : $scope.bookData.id
            };
            if ($rootScope.globals.authUser.isAdmin) {
                apiServices.process("post", "bookUpdate", data).then(function(response){
                    $scope.error_status = response.errorStatus;
                    $scope.error_messages = response.errorMessage;
                });
            } else {
                $location.path('/login');
            }
        }
    };
}]);
