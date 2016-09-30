angular.module('app.books').factory('apiServices', ['$http', '$q', function ($http, $q) {
    return {
        process: function(method, action, data) {
            var deferred = $q.defer();
            var request = "";
            if(method == "post"){
                request = $http.post('../services/'+action, data);
            } else {
                request = $http.get('../services/'+action);
            }
            request.success(function(data, status, headers, config)
            {
                deferred.resolve(data);
            })
            .error(function(data, status, headers, config)
            {
                console.log('error');
            });
            return deferred.promise;
        },
        
    };
}]);
