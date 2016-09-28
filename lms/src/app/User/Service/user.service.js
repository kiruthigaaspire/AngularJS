angular.module('lms.user').
  factory('User', ['$resource','domain', 'session',
     function($resource, domain, session) {
          // Pass session token as Authorization header
          var headers = {
            'Authorization': 'Bearer ' + session.getAccessToken()
          };
          return $resource(domain + '/user/:action/:id', {}, {
               query: {
                    method: 'GET',
                    isArray: true,
                    headers: headers
               },
               get: {
                    method: 'GET',
                    headers: headers
               },
               detail: {
                    method: 'GET',
                    params: {  
                         action: "detail",
                    },
                    headers: headers
               },
               register: {
                    method: 'POST',
               },
               unique: {
                    method: 'GET',
                    params: {  
                        action: "unique",
                        entity: "@entity",
                        value: "@value"                  
                    },
                    isArray: false,
                    headers: headers,
                    transformResponse: function (data) {
                         return { 
                              unique: angular.fromJson(data)       
                         };
                    }
               },
               update: {
                    method: 'PUT',
                    params: {
                         id: "@id"
                    },
                    headers: headers
                },
               approveUser: {
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