(function () {
    'use strict';

    angular
        .module('SmsSync.messageModule')
        .directive('messageWrapper', messageWrapper);
        
    messageWrapper.$inject = ['$compile', '$filter'];

    function messageWrapper($compile, $filter) {
        return {
            restrict: 'E',
            scope: {
            	messages: '='
            },
            link: function(scope, element, attrs) {
                scope.$watch('messages', function() {
                    var messageDom, messageContent;
                    element.empty();
                    for (var i in scope.messages) {
                        messageContent = $filter('formatMessageFilter')(scope.messages[i].content);
                        if (scope.messages[i].recipientNum === "") {
                            messageDom = '<div class="message-wrapper"><message class="received">' + messageContent + '</message></div><br>';
                        } else {
                            messageDom = '<div class="message-wrapper"><message class="sent">' + messageContent + '</message></div><br>';
                        }
                        element.append(messageDom);
                    }
                    element.scrollTop(element.prop("scrollHeight"));
                });
                /*scope.$watch('messages', function() {
                    element.empty();
                    for (var i in scope.messages) {
                        var newScope = scope.$new();
                        newScope.msg = scope.messages[i].content;
                        (scope.messages[i].recipientNum === "") ? newScope.sent = false : newScope.sent = true;
                        var el = $compile('<div class="message-wrapper"><message msg="msg" sent="sent"></message></div><br>')(newScope);
                        element.append(el);
                    }
                    element.scrollTop(element.prop("scrollHeight"));
                });*/
            }
        };
    }
})();