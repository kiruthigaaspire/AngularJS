angular.module('app.book').
  factory('Library', ['$resource',
    function($resource) {
      return $resource('http://localhost/LMS_backend/src/Library/Services/library.php/:action:user_id', {}, {
        query: {
          method: 'GET',
          params: {
              action: "getActivities"
          },
          isArray: true
        },
        save: {
          method: 'POST'
        },
        returnBook: {
          method: 'PUT',
          params: {
        	  action: "returnBook"
          }
        },
        confirm: {
          method: 'PUT',
          params: {
        	  action: "confirmIssue"
          }
        }
      });
    }
  ]);