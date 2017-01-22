(function () {
    'use strict';

    angular
        .module('SmsSync')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$scope', '$state', 'configFactory'];

    /* @ngInject */
    function SettingsController($scope, $state, configFactory) {
        var vm = this;

        vm.updateDbUrl = updateDbUrl;
        vm.loadApp = loadApp;
        $scope.success = undefined;
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
                $scope.success = true;
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