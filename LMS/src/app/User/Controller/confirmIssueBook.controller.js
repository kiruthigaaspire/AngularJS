angular.module('app.user').
controller( 'confirmIssueBookController', 
  function ConfirmIssueBookController($scope, Library, $stateParams, $state) {
	Library.confirm({user_id: $stateParams.user_id, book_id: $stateParams.book_id});
	$state.go('lendingManage');
  }
);