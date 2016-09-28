angular.module('lms.book', [
  'ui.router',
  'ui.bootstrap',
  'angular.filter'
]).config(
     function config($stateProvider) {
          $stateProvider.state('addBook', {
            url: '/book/new',
            views: {
              "main": {
                controller: 'addBookController',
                templateUrl: 'Book/View/book.tpl.html'
              }
            },
            data: {pageTitle: "Books", permission : 'Admin'}
          }).state('bookDetails', {
            url: '/book/detail/:id',
            views: {
              "main": {
                controller: 'detailBookController',
                templateUrl: 'Book/View/details.tpl.html'
              }
            },
             data: {pageTitle: "Book Details"}
          }).state('bookList', {
            url: '/books',
            views: {
              "main": {
                controller: 'listBookController',
                templateUrl: 'Book/View/list.tpl.html'
              }
            },
            data: {pageTitle: "Book List"}
          }).state('editBook', {
            url: '/book/:id',
            views: {
              "main": {
                controller: 'editBookController',
                templateUrl: 'Book/View/book.tpl.html'
              }
            },
             data: {pageTitle: "Book Details", permission : 'Admin'}
          }).state('deleteBook', {         
            url: '/book/:id',
            views: {
              "main": {
                controller: 'deleteBookController',
              }
            },
             data: {pageTitle: "Book Details", permission : 'Admin'}
          }).state('lendBook', {         
            url: '/book/lend/:id/:userId',
            views: {
              "main": {
                controller: 'lendBookController',
              }
            },
             data: {pageTitle: "Book Details", permission : 'User'}
          }).state('library', {         
            url: '/library',
            views: {
              "main": {
                controller: 'manageBookController',
                templateUrl: 'Book/View/library.tpl.html'
              }
            },
             data: {pageTitle: "Leding Approvals", permission : 'Admin'}
          }).state('distributeBook', {         
            url: '/book/distribute/:id/:userId',
            views: {
              "main": {
                controller: 'distributeBookController',
              }
            },
             data: {pageTitle: "Distribute Book", permission : 'Admin'}
          }).state('collectBook', {         
            url: '/book/collect/:id/:userId',
            views: {
              "main": {
                controller: 'collectBookController',
              }
            },
             data: {pageTitle: "Collect Book", permission : 'Admin'}
          }).state('returnBook', {         
            url: '/book/return/:id/:userId',
            views: {
              "main": {
                controller: 'returnBookController',
              }
            },
             data: {pageTitle: "Return Book", permission : 'Admin'}
          }).state('rejectLendRequest', {         
            url: '/book/reject/:id/:userId',
            views: {
              "main": {
                controller: 'rejectLendingRequestController',
              }
            },
             data: {pageTitle: "Reject Book", permission : 'Admin'}
          });
     });