angular.module('lms.user').
controller('detailUserController',
     function detailUserController($scope, $state, $stateParams, User) {
          $scope.userDetail = User.detail({'id': $stateParams.id});
     }
);
