angular.module('lms.book').
controller('returnBookController',
     function returnBookController($scope, $state, $stateParams , Book, auth) {
          Book.returnBook({id : $stateParams.id, userId: $stateParams.userId });                   
          $state.go('bookList');  
     }
);
