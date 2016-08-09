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
        update: {
          method: 'PUT'
        },
        delete: {
          method: 'DELETE'
        }
      });
    }
  ]);