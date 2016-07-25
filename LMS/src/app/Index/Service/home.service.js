angular.module('app.book').
  factory('Book', ['$resource',
    function($resource) {
      return $resource('http://localhost/LMS_backend/src/Book/Services/book.php/book/:id', { id: '@id' }, {
        query: {
          method: 'GET',
          isArray: true
        },
        save: {
          method: 'POST'
        },
        update: {
          method: 'PUT'
        },
        delete: {
          method: 'DELETE'
        }
      });
    }
  ]);
