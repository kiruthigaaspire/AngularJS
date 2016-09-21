angular.module('app.search', [
  'ui.router',
  'ui.bootstrap'
]).config(
  function config($stateProvider) {
    $stateProvider.state( 'SearchbookList', {
	  url: '/books',
	  views: {
	    "main": {
	      controller: 'searchController',
	      templateUrl: 'Books/View/list.tpl.html'
	    }
	  },  
    });
  }
);