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
        url: '/book/manage',
        views: {
          "mainContent": {
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
            controller: 'bookMainController',
            templateUrl: 'Book/View/book.tpl.html'
          },
          "bookContent@bookUpdate": {
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
            controller: 'bookMainController',
            templateUrl: 'Book/View/book.tpl.html'
          },
          "bookContent@bookAdd": {
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
                controller: 'bookMainController',
                templateUrl: 'Book/View/book.tpl.html'
              },            
            "bookContent@bookDelete": {
              controller: 'bookDeleteController',
              template: ' '
            }
          }, 
      });
  }
);
