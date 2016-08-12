angular.module('app.user').
controller( 'userActivitiesController', 
  function UserActivitiesController($scope, Library, $stateParams, Book) {
    Library.queryUser({user_id: $stateParams.id}, function(userActivities) {
    	$scope.userActivities = userActivities;
    	$scope.bookNameList = [];
    	angular.forEach($scope.userActivities, function(key, value) {
    	    Book.query({id : key.book_id}, function(book) {
    	        $scope.bookNameList[book[0].book_id] = book[0].book_name;
    	    });
		});
    });
  }
);