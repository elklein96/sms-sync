(function () {
    'use strict';

    angular
        .module('SmsSync')
        .controller('SMSController', SMSController);

    SMSController.$inject = ['$scope', '$filter', '$timeout', '$state', 'smsFactory'];

    /* @ngInject */
    function SMSController($scope, $filter, $timeout, $state, smsFactory) {
    	var vm = this;

        vm.selectedMessages = undefined;
        vm.sendMessage = sendMessage;
        vm.loadSettings = loadSettings;

        $scope.messages = undefined;
        $scope.unread = undefined;
        $scope.selected = {
            name: undefined,
            number: undefined
        };

        activate();

        function activate() {
            vm.contacts = smsFactory.getContacts();
            vm.conversations = smsFactory.getConversations();
            smsFactory.startMsgListener($scope);
        }

    	function sendMessage() {
            if ($scope.selected.name) {
                smsFactory.sendMessage($scope.message, $scope.selected.name, $scope.selected.number);
                $scope.message = '';
            }
        }

        function loadSettings() {
            $state.go('settings');
        }

        $scope.$watch('selected.name', function() {
            if (vm.contacts && $scope.selected.name) {

                if (smsFactory.isNewContact(vm.conversations, $scope.selected.name))
                    vm.conversations[vm.conversations.length] = {$id:$scope.selected.name};

                vm.contacts.$loaded(function() {
                    var contact = vm.contacts[vm.contacts.$indexFor($scope.selected.name)];
                    if (contact) {
                        smsFactory.setMessageRead($scope.selected.name);
                        $scope.selected.number = $filter('phoneNumberFilter')(contact.$value);
                        vm.selectedMessages = $scope.messages[$scope.selected.name];
                    }
                });
            } 
        });

        $scope.$watch('messages', function() {
            if ($scope.selected.name)
                vm.selectedMessages = $scope.messages[$scope.selected.name];
        });

        $scope.$watch('unread', function() {
            for (var key in $scope.unread) {
                if (key[0] !== "$") {
                    if ($scope.selected.name === key)
                        smsFactory.setMessageRead($scope.selected.name);
                }
            }
        });
    }
})();