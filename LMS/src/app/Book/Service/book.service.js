angular.module('app.book').
  factory('Book', ['$resource',
    function($resource) {
      return $resource('http://localhost/LMS_backend/src/Book/Services/book.php/book/:action', {}, {
        query: {
          method: 'GET',
          isArray: true
        },
        save: {
          method: 'POST',
          params: {
              action: 'newbook'
          }
        },
        update: {
          method: 'PUT',
          params: {
              action: 'updatebook'
          }
        },
        delete: {
          method: 'DELETE'
        },
        issue: {
          method: 'POST',
          params: {
              action: 'issuebook'
          }
        },
        returnBook: {
          method: 'PUT',
          params: {
              action: 'return'
          }
        }
      });
    }
  ]);
