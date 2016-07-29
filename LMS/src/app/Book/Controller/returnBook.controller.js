angular.module('app.book').
controller( 'returnBookController', 
  function ReturnBookController($scope) {
	// return updated => 'returned'
	$state.go('bookManage');
  }
);