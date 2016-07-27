angular.module('app.library', [
  'ui.router',
  'ui.bootstrap'
]).config(
  function config($stateProvider) {
    $stateProvider.state( 'userActivity', {
        url: '/user/activities/:id',
        views: {
            "main@": {
                controller: 'userMainController',
                templateUrl: 'Index/View/home.tpl.html'
              },
            "mainContent@userActivity": {
              controller: 'userActivitiesController',
              templateUrl: 'User/View/activity.tpl.html'
            }
          }, 
      })
      .state( 'bookManage', {
        url: '/manage',
        parent: 'book',
        views: {
          "main@": {
            controller: 'bookMainController',
            templateUrl: 'Book/View/book.tpl.html'
          },
          "bookContent@bookManage": {
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
