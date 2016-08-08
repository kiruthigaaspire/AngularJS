angular.module('app.book').
controller( 'bookDeleteController', 
  function BookDeleteController($scope, $stateParams, $state, Book) {
    var bookDetails = Book.deleteBook({id : $stateParams.id});
    $state.go('bookManage');
  }
);