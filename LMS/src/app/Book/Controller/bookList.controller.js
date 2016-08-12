angular.module('app.book').
controller( 'bookListController', 
  function BookListController($scope, Book, $rootScope, Library) {
	$scope.bookList = Book.query();
	if ($rootScope.admin) {
    	Library.query({user_id: $rootScope.globals.currentUser.userid}, function(book) {
    	    console.log(book[0]);
        });
	}
  }
);