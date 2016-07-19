angular.module('app.search', [
  'ui.router',
  'ui.bootstrap'
]).config(
  function config($stateProvider) {
    $stateProvider.state( 'bookList', {
	  url: '/books',
	  views: {
	    "main": {
	      controller: 'searchController',
	      templateUrl: 'Search/View/list.tpl.html'
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