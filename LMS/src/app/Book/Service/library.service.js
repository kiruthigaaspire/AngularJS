angular.module('app.book').
  factory('Library', ['$resource',
    function($resource) {
      return $resource('http://localhost/LMS_backend/src/Library/Services/library.php/lend/:action/:book_id:user_id', {}, {
        queryUser: {
          method: 'GET',
          params: {
            action: "user"  
          },
          isArray: true
        },
        queryBook: {
            method: 'GET',
            params: {
              action: "book"  
            },
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