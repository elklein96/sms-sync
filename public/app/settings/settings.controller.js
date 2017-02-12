(function () {
    'use strict';

    angular
        .module('SmsSync.settings')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$scope', '$state', 'configFactory'];

    /* @ngInject */
    function SettingsController($scope, $state, configFactory) {
        var vm = this;

        vm.updateDbUrl = updateDbUrl;
        vm.loadApp = loadApp;
        $scope.failure = undefined;

        activate();

        function activate() {
            configFactory.getDbUrl().then(function(data) {
                $scope.dbUrl = data;
            });
        }

        function updateDbUrl() {
            configFactory.setDbUrl($scope.dbUrl)
                .then(updateDbSuccess)
                .catch(updateDbError);

            function updateDbSuccess() {
                loadApp();
            }

            function updateDbError() {
                $scope.failure = true;
            }
        }

        function loadApp() {
            $state.go('index');
        }
    }
})();