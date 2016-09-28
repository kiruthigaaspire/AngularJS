angular.module('lms.book').
controller('rejectLendingRequestController',
     function rejectLendingRequestController($scope, $state, $stateParams , Book) {
          Book.rejectLendRequest({id : $stateParams.id, userId: $stateParams.userId      
     });  
     
     $state.go('library');
});
