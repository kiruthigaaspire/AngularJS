angular.module('formApp', [])
    .controller('FormController', ['$scope', function($scope) {
      $scope.interestOptions = [
	{'id':1, 'name':'PHP'},
	{'id':2, 'name':'angular'},
	{'id':3, 'name':'Ruby'}
	];

      $scope.update = function() {
        $scope.data = this.user;
      };

    }]);
