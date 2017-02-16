(function () {
    'use strict';

    angular
        .module('SmsSync.core')
        .factory('configFactory', config);

        config.$inject = ['$http', '$q'];

        /* @ngInject */
        function config($http, $q) {
            var service = {
                getDbUrl: getDbUrl,
                setDbUrl: setDbUrl
            };

            return service;

            function getDbUrl() {
                return $http.get('/config')
                    .then(getUrlSuccess)
                    .catch(getUrlError);

                function getUrlSuccess(res) {
                    return res.data;
                }

                function getUrlError(res) {
                    console.log("Could not get DB URL");
                }
            }

            function setDbUrl(url) {
                var defer = $q.defer();

                if (url.indexOf('firebaseio') < 0) defer.reject();
                else {
                    var data = {
                        firebaseURL: url
                    };
                    $http.put('/config', data)
                        .then(setUrlSuccess)
                        .catch(setUrlError);
                }
                function setUrlSuccess(res) {
                    defer.resolve(res.status);
                }

                function setUrlError(res) {
                    defer.reject();
                    console.log("Could not set DB URL");
                }
                return defer.promise;
            }
        }
})();