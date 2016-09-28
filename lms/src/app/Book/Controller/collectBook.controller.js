angular.module('lms.book').
controller('collectBookController',
     function collectBookController($scope, $state, $stateParams , Book) {
          Book.collectBook({id : $stateParams.id, userId: $stateParams.userId });                
          $state.go('library');
     }
);
