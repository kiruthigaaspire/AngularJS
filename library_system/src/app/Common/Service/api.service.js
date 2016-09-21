angular.module('app.books').factory('apiServices', ['$http', '$q', function ($http, $q) {
    return {
        process: function(method, url, data) {
            var deferred = $q.defer();
            var request = ""; var response = "";
            if(method == "post"){
                request = $http.post('../services/'+url, data);
            } else {
                request = $http.get('../services/'+url);
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