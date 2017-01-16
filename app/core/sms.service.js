(function () {
    'use strict';

    angular
        .module('SmsSync.core')
        .service('smsService', smsService);

        smsService.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseDataService'];

        /* @ngInject */
        function smsService($firebaseArray, $firebaseObject, firebaseDataService) {
        	var service = {
	    		getContacts: getContacts,
	    		getConversations: getConversations,
	    		startMsgListener: startMsgListener,
	    		sendMessage: sendMessage,
	    		setMessageRead: setMessageRead
	    	};

	    	return service;

	        function getContacts() {
	        	var contacts = $firebaseArray(firebaseDataService.contacts);
	        	return contacts;
	        }

	        function getConversations() {
	        	var conversations = $firebaseArray(firebaseDataService.messages);
	        	return conversations;
	        }

	        function startMsgListener(scope) {
	        	var msg = $firebaseObject(firebaseDataService.messages);
	        	msg.$bindTo(scope, 'messages');

				var unread = $firebaseObject(firebaseDataService.lastReceived);
	        	unread.$bindTo(scope, 'unread');
	        }

	        function sendMessage(content, recipientName, recipientNum) {
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

	        function setMessageRead(name) {
	        	if (name !== undefined) {
	        		var lastReceived = $firebaseArray(firebaseDataService.lastReceived);
	        		lastReceived.$loaded(function() {
	        			var i = lastReceived.$indexFor(name);
	        			if (i > -1)
	        				lastReceived.$remove(i);
	        		});
	        	}
	        }
        }
})();