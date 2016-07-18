/**
 * And of course we define a controller for our route.
 */
angular
    .module('gamaMobileApp.book')

    .controller(
        'BookIndexController',
        function PickUpIndexController($scope, $state, $http, domain, $location, $rootScope, $route, $timeout) {
        
        $scope.mobileRegx = /^[0-9]+$/;
                 
         if (sessionStorage.getItem('booksList')) {
            $rootScope.booksList = JSON.parse(sessionStorage.getItem('booksList'));
            sessionStorage.removeItem('booksList');
         } else {
            $rootScope.loading = true; 
            $http.get(domain+'/book_library/BookController.php/books').success(
                function(data, status, headers, config) {
                    $rootScope.booksList = data;
                    sessionStorage.setItem('booksList', JSON.stringify(data));                 
            }).finally(function () {
                  //Hide loading spinner whether our call succeeded or failed.
                  $rootScope.loading = false;                     
            });
         }
          $scope.getPickupListDisplay = function() {
            return $scope.displayPickupList;
          };

          $scope.setPickupListDisplay = function(pickupListDisplay) {
            $scope.displayPickupList = pickupListDisplay;
          };

          $scope.getbook = function(book) {
						$rootScope.book = book;
						$state.go('pickuplist');
          };
          
          $scope.lendbook = function(book) { 
						book.userid = $rootScope.customerId;
            book.useremail = $rootScope.customerEmail;
						$rootScope.loading = true;
						$http.post(domain+'/book_library/UserController.php/user/lendbook', book)
            .success(function(data, status, headers, config) {
              alert(data['messages']);
            }).error(function(data, status, headers, config) {
              alert('Your request not processed due to some problem please try again later.');
            }).finally(function () {
              //Hide loading spinner whether our call succeeded or failed.
              $rootScope.loading = false;
            });
					};
					
					$scope.getLendRequestDtls = function() {
						$rootScope.loading = true; 
						$rootScope.currentPage = 1;
            $http.get(domain+'/book_library/BookController.php/book/lendrequests').success(
                function(data, status, headers, config) {
                    $rootScope.lendList = data;
                    sessionStorage.setItem('lendList', JSON.stringify(data));                 
            }).finally(function () {
                  //Hide loading spinner whether our call succeeded or failed.
                  $rootScope.loading = false;                     
            });
					};
					
					$scope.approveLend = function(book) {
						$rootScope.loading = true;
						 $http.post(domain+'/book_library/BookController.php/book/approvelend', book)
								.success(function(data, status, headers, config) {
									alert('Approved Lend Request successfully');
								}).error(function(data, status, headers, config) {
									alert('Failed due server problem, please try again later.');
								}).finally(function () {
									$rootScope.loading = false;
								});
								 $state.reload();
					};
           
           $scope.hide_block=function()
           { $scope.message=null;}; 


          $scope.addBook = function() {
						$rootScope.book = {};
						$state.go('addbook');
          }; 
          
          $scope.editbook = function(book) {
						book.published_date = new Date(book.published_date);
						$rootScope.book = book;
						$state.go('addbook');
					};
          
          $scope.saveBook = function() {
						$scope.messages = [];
       		  if($scope.book === undefined) {
       			   $scope.messages = ['* All fields are mandatotary'];
        			 $scope.errors = true;
		        } else if($scope.book['book_code'] === null || $scope.book['book_code'] === '') { 
    		       $scope.errors = true;
         			 $scope.messages = ['Please enter a Book Code'];
		        } else if($scope.book['book_name'] === null || $scope.book['book_name'] === '') { 
    		       $scope.errors = true;
         			 $scope.messages = ['Please enter a Book Name'];
		        } else if( $scope.book['author'] === null || $scope.book['author'] === '' ) { 
    			      $scope.errors = true;
          			$scope.messages = ['Please enter author of the book'];
		        } else if( $scope.book['published_date'] === null || $scope.book['published_date'] === '' ) {
    		        $scope.errors = true;
        		    $scope.messages = ['Please enter a published date'];
		        } else if( $scope.book['rack_no'] === null || $scope.book['rack_no'] === '' ) {
    		        $scope.messages = ['please enter rack no'];
        		    $scope.errors = true;
		        } else if( $scope.book['price'] === null || $scope.book['price'] === '' ) {
    		        $scope.messages = ['Please enter price of the book'];
        		    $scope.errors = true;
		        }else if( $scope.book['description'] === null || $scope.book['description'] === '' ) {
    		        $scope.messages = ['Please enter description of the book'];
        		    $scope.errors = true;
		        }  else {
								$rootScope.loading = true;
								$http.post(domain+'/book_library/BookController.php/book', $scope.book)
									.success(function(data, status, headers, config) {
										alert(data['messages']);
										$location.path('/books-list');
								}).error(function(data, status, headers, config) {
										$scope.errors = true;
										alert(data['messages']);
							}).finally(function () {
								$rootScope.loading = false;
							});
        		}
					};
					
					$scope.updateBook = function(book) {
						$scope.messages = [];
						if(book === undefined) {
       			   $scope.messages = ['* All fields are mandatotary'];
        			 $scope.errors = true;
		        } else if(book['book_code'] === null || book['book_code'] === '') { 
    		       $scope.errors = true;
         			 $scope.messages = ['Please enter a Book Code'];
		        } else if(book['book_name'] === null || book['book_name'] === '') { 
    		       $scope.errors = true;
         			 $scope.messages = ['Please enter a Book Name'];
		        } else {
								$rootScope.loading = true;
								$http.post(domain+'/book_library/BookController.php/book/update', book)
									.success(function(data, status, headers, config) {
										alert(data['messages']);
										$location.path('/books-list');
								}).error(function(data, status, headers, config) {
										$scope.errors = true;
										alert(data['messages']);
							}).finally(function () {
								$rootScope.loading = false;
							});
        		}
					};

});
