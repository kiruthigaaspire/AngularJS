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
    })
    .state( 'bookManage', {
        url: '/manage',
        parent: 'book',
        views: {
          "main@": {
            templateUrl: 'Index/View/home.tpl.html'
          },
          "mainContent@bookManage": {
            controller: 'bookListController',
            templateUrl: 'Book/View/list.tpl.html'
          }
        },  
      })
      .state( 'bookUpdate', {
        url: '/edit/:id',
        parent: 'book',
        views: {
          "main@": {
            templateUrl: 'Index/View/home.tpl.html'
          },
          "mainContent@bookUpdate": {
            controller: 'bookEditController',
            templateUrl: 'Book/View/new.tpl.html'
          }
        },  
      })
      .state( 'bookAdd', {
        url: '/add',
        parent: 'book',
        views: {
          "main@": {
            templateUrl: 'Index/View/home.tpl.html'
          },
          "mainContent@bookAdd": {
            controller: 'bookAddController',
            templateUrl: 'Book/View/new.tpl.html'
          }
        },  
      })
      .state( 'bookDelete', {
        url: '/delete/:id',
        parent: 'book',
        views: {
            "main@": {
                templateUrl: 'Index/View/home.tpl.html'
              },            
            "mainContent@bookDelete": {
              controller: 'bookDeleteController',
              template: ' '
            }
          }, 
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
      });
  }
);
