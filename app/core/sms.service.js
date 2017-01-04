(function () {
    'use strict';

    angular
        .module('SmsSync.core')
        .service('smsService', smsService);

        smsService.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseDataService'];

        function smsService($firebaseArray, $firebaseObject, firebaseDataService) {
        	var service = {
	    		getContacts: getContacts,
	    		startMsgListener: startMsgListener,
	    		sendMessage: sendMessage
	    	};

	    	return service;

	        function getContacts() {
	        	var contacts = $firebaseArray(firebaseDataService.messages);
	        	return contacts;
	        }

	        function startMsgListener(scope) {
	        	var obj = $firebaseObject(firebaseDataService.messages);
	        	obj.$bindTo(scope, 'messages');
	        }

	        function sendMessage(content, recipientName, recipientNum = '') {
	        	var msgData = {
		            content: content,
		            recipientNum: recipientNum
		        };

	        	var msg = $firebaseArray(firebaseDataService.messages.child(recipientName));
	        	msg.$add(msgData);

	        	var lastMsgContent = $firebaseObject(firebaseDataService.lastMsg);
	        	lastMsgContent.content = content;
	        	lastMsgContent.recipientNum = recipientNum;
	        	lastMsgContent.$save();
	        }
        }
})();