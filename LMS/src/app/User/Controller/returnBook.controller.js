angular.module('app.user').
controller( 'returnBookController', 
  function ReturnBookController($scope, Library, $rootScope, $stateParams, $state) {
	Library.returnBook({user_id: $rootScope.globals.currentUser.userid, book_id: $stateParams.book_id});
	$state.go('bookManage');
  }
);