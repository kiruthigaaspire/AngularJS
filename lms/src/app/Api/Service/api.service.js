angular.module('app.books').factory('apiServices', ['$http', '$q', function ($http, $q) {
    return {
        process: function(method, action, data) {
            var deferred = $q.defer();
            var httpRequest = "";
            if(method == "post"){
                httpRequest = $http.post('../services/'+action, data);
            } else {
                httpRequest = $http.get('../services/'+action);
            }
            httpRequest.success(function(data, status, headers, config)
            {
                deferred.resolve(data);
            })
            .error(function(data, status, headers, config)
            {
                console.log('unexpected error');
            });
            return deferred.promise;
        },
        
    };
}]);
