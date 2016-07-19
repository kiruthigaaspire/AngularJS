angular.module('app.books', [
  'ui.router',
  'ui.bootstrap'
]).config(
  function config($stateProvider) {
    $stateProvider.state( 'addBook', {
	  url: '/book/add',
	  views: {
	    "main": {
	      controller: 'bookController',
	      templateUrl: 'Books/View/books.tpl.html'
	    }
	  },  
    }).state( 'editBook', {
	  url: '/book/:id/edit',
	  views: {
	    "main": {
	      controller: 'bookController',
	      templateUrl: 'Books/View/books.tpl.html'
	    }
	  },  
    });
  }
);