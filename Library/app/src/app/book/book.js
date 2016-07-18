angular.module( 'gamaMobileApp.book', [
  'ui.router'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'books-list', {
    url: '/books-list',
    views: {
      "main": {
        controller: 'BookIndexController',
        templateUrl: 'book/view/index/form.tpl.html'
      }
    },
    data:{ pageTitle: '', pageCaption:'', showBreadCrumb:false, showCart:false }
  })
  .state( 'pickuplist', {
    url: '/pickuplist',
    views: {
      "main": {
        controller: 'BookIndexController',
        templateUrl: 'book/view/index/book.tpl.html'
      }
    },
    data:{ pageTitle: 'Book Details', pageCaption:'Book Details', showBreadCrumb:true, breadCrumbLink:'books-list' }
  })
  .state( 'lendrequests', {
    url: '/lendrequests',
    views: {
      "main": {
        controller: 'BookIndexController',
        templateUrl: 'book/view/index/lendrequests.tpl.html'
      }
    },
    data:{ pageTitle: 'Lend Request Details', pageCaption:'Lend Request Details', showBreadCrumb:true, breadCrumbLink:'books-list' }
  })
  .state( 'addbook', {
    url: '/addbook',
    views: {
      "main": {
        controller: 'BookIndexController',
        templateUrl: 'book/view/index/addeditbook.tpl.html'
      }
    },
    data:{ pageTitle: 'Add/Edit Book', pageCaption:'Add/Edit Book', showBreadCrumb:true, breadCrumbLink:'books-list' }
  });
  
  

});

