(function () {
    'use strict';

    angular
        .module('SmsSync')
        .controller('SMSController', SMSController);

    SMSController.$inject = ['$scope', '$filter', 'smsService'];

    /* @ngInject */
    function SMSController($scope, $filter, smsService) {
    	$scope.selected = {
            name: undefined,
            number: undefined
        };
        $scope.selectedMessages = undefined;
        $scope.contacts = smsService.getContacts();
        $scope.conversations = smsService.getConversations();
        smsService.startMsgListener($scope);

    	$scope.sendMessage = function() {
            if ($scope.selected.name !== undefined) {
                smsService.sendMessage($scope.message, $scope.selected.name, $scope.selected.number);
                $('#message-input').val('');
            }
        };

        $scope.$watch('selected.name', function() {
            $scope.contacts.$loaded(function() {
                var contact = $scope.contacts[$scope.contacts.$indexFor($scope.selected.name)];
                if ($scope.selected.name !== undefined && contact !== undefined) {
                    smsService.setMessageRead($scope.selected.name);
                    $scope.selected.number = $filter('phoneNumberFilter')(contact.$value);
                    $scope.selectedMessages = $scope.messages[$scope.selected.name];
                }
            });
        });

        $scope.$watch('messages', function() {
            if ($scope.selected.name !== undefined)
                $scope.selectedMessages = $scope.messages[$scope.selected.name];
        });

        $scope.$watch('unread', function() {
            for (var key in $scope.unread) {
                if (key[0] !== "$") {
                    displayNotification(key, $scope.unread[key].content);
                    if ($scope.selected.name === key)
                        smsService.setMessageRead($scope.selected.name);
                }
            }
        });
        
        function displayNotification(title, content) {
            var notification = {
                title: "New Message",
                body: ""
            }

            notification.title = title;
            notification.body = content;
            new Notification(notification.title, notification);
        }
    }
})();