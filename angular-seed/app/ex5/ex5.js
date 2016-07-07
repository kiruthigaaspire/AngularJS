'use strict';

angular.module('myApp.ex5', ['ngRoute','angular.filter'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ex5', {
    templateUrl: 'ex5/ex5.html',
    controller: 'Ex5Ctrl'
  });
}])
.controller('Ex5Ctrl', function($scope, $http) {    
  $scope.divShow = "div1";

  $scope.show = function(arg) {
    $scope.divShow = arg;
  }
  
 var url = 'http://localhost/rest/crud.php';
   $http({
	      method: 'post',
	      url: url,
	      data: {'action' : 'getBooks' },
          headers: {"Content-Type": "application/json"}
        }).
	    success(function(data, status, headers, config) {	    	
	   		$scope.books = data.data;
	    }).
	    error(function(data, status, headers, config) {
	    	//$scope.messageFailure(data.message);
	    });
        
        
      $scope.deleteBook = function(book, books){
		var r = confirm("Are you sure want to delete this Book!");
		if (r == true) {
			$http({
		      method: 'post',
		      url: url,
		      data: { 'id' : book.id, 'action' : 'deleteBook' },
		      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    }).
		    success(function(data, status, headers, config) {
		    	if(data.success){		    		
                    var index = $scope.books.indexOf(book);
		    		$scope.books.splice(index, 1);
		    	}else{
		    		$scope.messageFailure(data.message);
		    	}
		    }).
		    error(function(data, status, headers, config) {
		    	//$scope.messageFailure(data.message);
		    });
		}
	}  
});
