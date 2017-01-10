(function () {
    'use strict';

    angular
        .module('SmsSync')
        .controller('SMSController', SMSController);

    SMSController.$inject = ['$scope', '$timeout', '$filter', 'smsService'];

    /* @ngInject */
    function SMSController($scope, $timeout, $filter, smsService){
    	$scope.selected = {
            name: undefined,
            number: undefined
        };
        $scope.contacts = smsService.getContacts();
        smsService.startMsgListener($scope);

    	$scope.sendMessage = function() {
            if ($scope.selected.name !== undefined) {
                smsService.sendMessage($scope.message, $scope.selected.name, $scope.selected.number);
                $('#message-input').val('');
            }
        };

        $scope.$watch('selected.name', function() {
            $("#recipient").text($scope.selected.name);
            smsService.setMessageRead($scope.selected.name);
            $('#'+$filter('removeSpacesFilter')($scope.selected.name)).find('.unread').remove();
            displayMessage();
        });

        $scope.$watch('messages', function() {
            displayMessage();
        });

        $scope.$watch('unread', function() {
            for (var key in $scope.unread) {
                if (key[0] !== "$" && key !== $scope.selected.name) {
                    displayNotification(key, $scope.unread[key].content);
                    $timeout(function() {
                        $('#'+$filter('removeSpacesFilter')(key)).append('<div class="unread"></div>');
                    }, 500);
                }
                else if (key === $scope.selected.name) {
                    smsService.setMessageRead($scope.selected.name);
                    displayNotification(key, $scope.unread[key].content);
                }
                // if app is inactive
                // new Notification(notification.title, notification);
            }
        });

        function displayMessage() {
            var messageStr;
            $('#chat-wrapper').empty();
            if ($scope.selected.name !== undefined) {
                var data = $scope.messages[$scope.selected.name];
                for (var i in data) {
                    if (data[i].recipientNum === "") {
                        messageStr = '<div class="message-wrapper"><message class="received">' + data[i].content + '</message></div><br>';
                    } else {
                        $scope.selected.number = data[i].recipientNum; 
                        messageStr = '<div class="message-wrapper"><message class="sent">' + data[i].content + '</message></div><br>';
                    }
                    $('#chat-wrapper').append(messageStr);
                }
                $('#chat-wrapper')[0].scrollTop = $('#chat-wrapper')[0].scrollHeight;
                $('#send').blur();
            }
        }

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