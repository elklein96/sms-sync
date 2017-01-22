(function () {
    'use strict';

    angular
        .module('SmsSync.messageModule')
        .directive('messageWrapper', messageWrapper);
        
    messageWrapper.$inject = ['$compile'];

    function messageWrapper($compile) {
        return {
            restrict: 'E',
            scope: {
            	messages: '='
            },
            link: function(scope, element, attrs) {
                scope.$watch('messages', function() {
                    var messageStr;
                    element.empty();
                    for (var i in scope.messages) {
                        if (scope.messages[i].recipientNum === "") {
                            messageStr = '<div class="message-wrapper"><message class="received">' + scope.messages[i].content + '</message></div><br>';
                        } else {
                            messageStr = '<div class="message-wrapper"><message class="sent">' + scope.messages[i].content + '</message></div><br>';
                        }
                        element.append(messageStr);
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