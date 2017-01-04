(function () {
    'use strict';

    angular
        .module('SmsSync')
        .controller('SMSController', SMSController);

    SMSController.$inject = ['$scope', 'smsService'];

    /* @ngInject */
    function SMSController($scope, smsService){
    	$scope.selected = {
            name: undefined,
            number: undefined
        };
        $scope.contacts = smsService.getContacts();
        smsService.startMsgListener($scope);

    	$scope.sendMessage = function() {
            if ($scope.selected.name != undefined) {
                smsService.sendMessage($scope.message, $scope.selected.name, $scope.selected.number);
                $('#message-input').val('');
            }
        }

        $scope.$watch('selected.name', function() {
            $("#recipient").text($scope.selected.name);
            displayMessage();
        });

        $scope.$watch('messages', function() {
            displayMessage();
        });

        function displayMessage() {
            var messageStr;
            $('#chat-wrapper').empty();
            if ($scope.selected.name != undefined) {
                var data = $scope.messages[$scope.selected.name];
                for (var i in data) {
                    if (data[i].recipientNum === "") {
                        messageStr = '<p class="message received">' + data[i].content + '</p><br>';
                    } else {
                        $scope.selected.number = data[i].recipientNum; 
                        messageStr = '<p class="message sent">' + data[i].content + '</p><br>';
                    }
                    $('#chat-wrapper').append(messageStr);
                }
                $('#chat-wrapper')[0].scrollTop = $('#chat-wrapper')[0].scrollHeight;
                $('#send').blur();
            }
        }
    }
})();