(function () {
    'use strict';

    angular
        .module('SmsSync', ['firebase',
                            'ui.router',
                            'SmsSync.core',
                            'SmsSync.messageModule',
                            'SmsSync.contactModule',
                            'SmsSync.autoComplete'])

        .factory('configInterceptor', configInterceptor)
        .config(config);

        configInterceptor.$inject = ['$http', '$q'];

        /* @ngInject */
        function configInterceptor($http, $q) {
            return function() {
                var defer = $q.defer();

                $http.get('/config')
                    .then(dbUrlSuccess)
                    .catch(dbUrlError);

                function dbUrlSuccess(res) {
                    defer.resolve(res.data);
                }

                function dbUrlError(res) {
                    defer.resolve();
                }

                return defer.promise;
            };
        }

        config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
        
        /* @ngInject */
        function config($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/');
            $locationProvider.html5Mode(true);
            $stateProvider
                .state('index', {
                    url: '/',
                    templateUrl: 'app/chat/chat.html',
                    controller: 'SMSController',
                    controllerAs: 'vm',
                    resolve: {
                        configURL: function(configInterceptor) {
                            return configInterceptor();
                        }
                    },
                    onEnter: function($state, configURL) {
                        if (!configURL) $state.go('settings');
                        else if (firebase.apps.length === 0) {
                            var config = {
                                databaseURL: configURL,
                            };
                            firebase.initializeApp(config);
                        }
                    }
                })
                .state('settings', {
                    url: '/settings',
                    templateUrl: 'app/settings/settings.html',
                    controller: 'SettingsController',
                    controllerAs: 'vm'
                });
        }
})();