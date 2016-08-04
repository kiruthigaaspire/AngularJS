angular.module('app.book', [
  'ui.router',
  'ui.bootstrap'
]).config(
  function config($stateProvider) {
    $stateProvider.state( 'book', {
	  url: '/book',
	  views: {
	    "main@": {
	      templateUrl: 'Book/View/book.tpl.html'
	    }
	  },
	  data: {
	      pageTitle: 'Welcome',
	      authenticatedUser: false
	  }
    })
    .state( 'bookManage', {
        url: '/book/manage',
        views: {
          "main@": {
            templateUrl: 'Index/View/home.tpl.html'
          },
          "mainContent@bookManage": {
            controller: 'bookListController',
            templateUrl: 'Book/View/list.tpl.html'
          }
        },
        data: {
            pageTitle: 'Book Manage',
            authenticatedUser: false
        }  
      })
      .state( 'bookUpdate', {
        url: '/book/edit/:id',
        views: {
          "main@": {
            templateUrl: 'Index/View/home.tpl.html'
          },
          "mainContent@bookUpdate": {
            controller: 'bookEditController',
            templateUrl: 'Book/View/new.tpl.html'
          }
        },
        data: {
            pageTitle: 'Book - Update',
            authenticatedUser: true,
            userRole: 'admin'
        }  
      })
      .state( 'bookAdd', {
        url: '/book/add',
        views: {
          "main@": {
            templateUrl: 'Index/View/home.tpl.html'
          },
          "mainContent@bookAdd": {
            controller: 'bookAddController',
            templateUrl: 'Book/View/new.tpl.html'
          }
        },
        data: {
            pageTitle: 'Book - Add',
            authenticatedUser: true,
            userRole: 'admin'
        }  
      })
      .state( 'bookDelete', {
        url: '/book/delete/:id',
        views: {
            "main@": {
                templateUrl: 'Index/View/home.tpl.html'
              },            
            "mainContent@bookDelete": {
              controller: 'bookDeleteController',
              template: ' '
            }
          },
          data: {
              pageTitle: 'Book - Delete',
              authenticatedUser: true,
              userRole: 'admin'
          } 
      })
      .state( 'lendingBook', {
        url: '/lending/:book_id',
        views: {
          "main@": {
            templateUrl: 'Index/View/home.tpl.html'
          },
          "mainContent@lendingBook": {
            controller: 'bookLendingController',
            template: ' '
          }
        },
        data: {
            pageTitle: 'Lending Book',
            authenticatedUser: true,
            userRole: 'user'
        }  
      })
      .state( 'returnBook', {
        url: '/return/:book_id',
        views: {
          "main@": {
            templateUrl: 'Index/View/home.tpl.html'
          },
          "mainContent@returnBook": {
            controller: 'returnBookController',
            template: ' '
          }
        },
        data: {
            pageTitle: 'Return Book',
            authenticatedUser: true,
            userRole: 'user'
        }  
      });
  }
);
