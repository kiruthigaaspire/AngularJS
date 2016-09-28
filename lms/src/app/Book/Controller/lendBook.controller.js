angular.module('lms.book').
controller('lendBookController',
     function lendBookController($scope, $state, $stateParams , Book) {
          Book.lendBook({id : $stateParams.id, userId: $stateParams.userId });
          $scope.takenBooks = $scope.takenBooks + 1;
          $state.go('bookList');              
     }
);
