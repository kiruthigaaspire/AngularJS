angular.module('app.books', [
  'ui.router',
  'ui.bootstrap'
]).config(
  function config($stateProvider) {
    $stateProvider.state( 'bookList', {
	  url: '/books',
	  views: {
	    "main": {
	      controller: 'bookController',
	      templateUrl: 'Books/View/list.tpl.html'
	    }
	  },  
    }).state( 'myBooks', {
        url: '/myBooks',
        views: {
          "main": {
            controller: 'bookController',
            templateUrl: 'Books/View/mylist.tpl.html'
          }
        },  
      }).state( 'addBook', {
	  url: '/book/add',
	  views: {
	    "main": {
	      controller: 'bookController',
	      templateUrl: 'Books/View/add.tpl.html'
	    }
	  },  
    }).state( 'editBook', {
        url: '/book/edit/:id',
        views: {
          "main": {
            controller: 'bookController',
            templateUrl: 'Books/View/edit.tpl.html'
          }
        },  
      }).state( 'bookDetails', {
	  url: '/book/:id',
	  views: {
	    "main": {
	      controller: 'bookController',
	      templateUrl: 'Books/View/view.tpl.html'
	    }
	  },
	  
    });
  }
);
