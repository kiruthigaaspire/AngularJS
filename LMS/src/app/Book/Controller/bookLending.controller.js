angular.module('app.book').
controller( 'bookLendingController', 
  function BookLendingController($scope, $state, $stateParams, Book) {
	// Lending save  => 'Issued'
	$state.go('bookManage');
  }
);