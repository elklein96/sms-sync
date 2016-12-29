(function () {
    'use strict';

    angular
        .module('SmsSync')
        .controller('SMSController', SMSController);

    SMSController.$inject = ['$scope', 'smsService'];

    /* @ngInject */
    function SMSController($scope, smsService){
    	$scope.contacts = smsService.getContacts();
    	$scope.messages = smsService.startMsgListener();
    }

})();