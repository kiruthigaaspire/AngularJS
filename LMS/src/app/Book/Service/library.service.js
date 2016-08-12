angular.module('app.book').
  factory('Library', ['$resource',
    function($resource) {
      return $resource('http://localhost/LMS_backend/src/Library/Services/library.php/lend/:action/:book_id', {}, {
        query: {
          method: 'GET',
          isArray: true
        },
        save: {
          method: 'POST'
        },
        returnBook: {
          method: 'PUT',
          params: {
        	  action: "return"
          }
        },
        confirm: {
          method: 'PUT',
          params: {
        	  action: "approve"
          }
        }
      });
    }
  ]);