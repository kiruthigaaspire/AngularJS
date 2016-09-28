angular.module('lms.book').
controller('distributeBookController',
     function distributeBookController($scope, $state, $stateParams , Book) {
          Book.distributeBook({id : $stateParams.id, userId: $stateParams.userId });            
          $state.go('library');
     }
);
