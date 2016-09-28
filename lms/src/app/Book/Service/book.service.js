angular.module('lms.book').
  factory('Book', ['$resource', 'domain', 'session',
    function($resource, domain, session) {
          // Pass session token as Authorization header
          var headers = {
            'Authorization': 'Bearer ' + session.getAccessToken()
          };
          
          return $resource(domain+'/book/:action/:id/:userId', {}, {
               query: {
                    method: 'GET',
                    isArray: true
               },
               get: {
                    method: 'GET'
               },
               lendBook: {
                    method: 'POST',
                    params: {  
                       action: "lend",
                       id: "@id",
                       userId: "@userId"
                    },
                    headers: headers
               },
               distributeBook: {
                    method: 'PUT',
                    params: {  
                       action: "distribute",
                       id: "@id",
                       userId: "@userId"
                    },
                    headers: headers
               },
               returnBook: {
                    method: 'PUT',
                    params: {  
                       action: "return",
                       id: "@id",
                       userId: "@userId"
                    },
                    headers: headers
               },
               collectBook: {
                    method: 'PUT',
                    params: {  
                         action: "collect",
                       id: "@id",
                       userId: "@userId"
                    },
                    headers: headers
               },
               rejectLendRequest: {
                    method: 'PUT',
                    params: {  
                       action: "reject",
                       id: "@id",
                       userId: "@userId"
                    },
                    headers: headers
               },
               lendings: {
                    method: 'GET',
                    params: {  
                       action: "lendings",
                       userId: "@userId"
                    },
                    isArray: true,
                    headers: headers
               },
               library: {
                    method: 'GET',
                    params: {  
                       action: "library"
                    },
                    isArray: true,
                    headers: headers
               },
               detail: {
                    method: 'GET',
                    params: {  
                       action: "detail"
                    }
               },
               save: {
                    method: 'POST',
                    headers: headers
               },
               update: {
                    method: 'PUT',
                    params: {
                         id: "@id"
                    },
                    headers: headers
               },
               delete: {
                    method: 'DELETE',
                    headers: headers
                }     
          });
     }
]);