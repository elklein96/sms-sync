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
        $scope.focused = false;
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
                    app.ipcRenderer.send('hide-notification', '');
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
                    if (!$scope.focused) {
                        displayNotification(key, $scope.unread[key].content);
                    }
                    if ($scope.selected.name === key){
                        app.ipcRenderer.send('hide-notification', '');
                        smsService.setMessageRead($scope.selected.name);
                    }
                }
            }
        });

        app.ipcRenderer.on('window-state', function(event, data) {
            (data === "focus") ? $scope.focused = true : $scope.focused = false;
        });
        
        function displayNotification(title, content) {
            var notification = {
                title: "New Message",
                body: ""
            }
            app.ipcRenderer.send('show-notification', '');
            notification.title = title;
            notification.body = content;
            new Notification(notification.title, notification);
        }
    }
})();