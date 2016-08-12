angular.module('app.book').
controller( 'bookLendingListController', 
  function BookLendingListController($scope, Library, Book) {
	Library.queryBook(function(books){
		$scope.lendingBooks = books;
		$scope.bookNameList = [];
    	angular.forEach($scope.lendingBooks, function(key, value) {
    	    Book.query({id : key.book_id}, function(book) {
    	        $scope.bookNameList[book[0].book_id] = book[0].book_name;
    	    });
		});
	});
  }
);