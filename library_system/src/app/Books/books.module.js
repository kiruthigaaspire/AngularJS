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
    }).state( 'addBook', {
	  url: '/book/add',
	  views: {
	    "main": {
	      controller: 'bookController',
	      templateUrl: 'Books/View/books.tpl.html'
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