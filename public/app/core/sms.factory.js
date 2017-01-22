(function () {
    'use strict';

    angular
        .module('SmsSync.core')
        .service('smsFactory', smsFactory);

        smsFactory.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseData'];

        /* @ngInject */
        function smsFactory($firebaseArray, $firebaseObject, firebaseData) {
        	var service = {
	    		getContacts: getContacts,
	    		getConversations: getConversations,
	    		startMsgListener: startMsgListener,
	    		sendMessage: sendMessage,
	    		setMessageRead: setMessageRead,
	    		isNewContact: isNewContact
	    	};

	    	return service;

	        function getContacts() {
	        	var contacts = $firebaseArray(firebaseData.contacts);
	        	return contacts;
	        }

	        function getConversations() {
	        	var conversations = $firebaseArray(firebaseData.messages);
	        	return conversations;
	        }

	        function startMsgListener(scope) {
	        	var msg = $firebaseObject(firebaseData.messages);
	        	msg.$bindTo(scope, 'messages');

				var unread = $firebaseObject(firebaseData.lastReceived);
	        	unread.$bindTo(scope, 'unread');
	        }

	        function sendMessage(content, recipientName, recipientNum) {
	        	var msgData = {
		            content: content,
		            recipientNum: recipientNum
		        };

	        	var msg = $firebaseArray(firebaseData.messages.child(recipientName));
	        	msg.$add(msgData);

	        	var lastMsgContent = $firebaseObject(firebaseData.lastMsg);
	        	lastMsgContent.content = content;
	        	lastMsgContent.recipientNum = recipientNum;
	        	lastMsgContent.$save();
	        }

	        function setMessageRead(name) {
	        	if (name !== undefined) {
	        		var lastReceived = $firebaseArray(firebaseData.lastReceived);
	        		lastReceived.$loaded(function() {
	        			var i = lastReceived.$indexFor(name);
	        			if (i > -1)
	        				lastReceived.$remove(i);
	        		});
	        	}
	        }

	        function isNewContact(convos, contact) {
	        	var isNew = true;

	        	for (var i = 0; i < convos.length; i++) {
	        		if (convos.$keyAt(i) === contact){
	        			isNew = false;
	        			break;
	        		}
	        	}

	        	return isNew;
	        }
        }
})();