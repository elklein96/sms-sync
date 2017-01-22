(function () {
    'use strict';

    angular
        .module('SmsSync.messageModule')
        .directive('message', message);
        
    function message() {
        return {
            restrict: 'E',
            scope: {
            	msg: '=msg',
                sent: '=sent'
            },
            templateUrl: 'app/chat/messages/message.html',
            link: function(scope, element, attrs) {
                
            }
        };
    }
})();