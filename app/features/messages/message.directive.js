(function () {
    'use strict';

    angular
        .module('SmsSync')
        .directive('message', message);
        
    function message() {
        return {
            restrict: 'E',
            scope: {
            	msg: '=msg',
                sent: '=sent'
            },
            templateUrl: 'app/features/messages/message.html',
            link: function(scope, element, attrs) {
                
            }
        };
    }
})();