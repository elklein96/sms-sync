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
	        	var contacts = [];
	        	var msg = $firebaseArray(firebaseDataService.messages);

	        	console.log(msg);

	        	for (var key in msg) {
		        	console.log(key);
		            // contacts.push(key);
		        }
	        	
	        	return contacts;
	        }

	        function startMsgListener() {
	        	return ["Message 1", "Message 2", "Message 3"];
	        }

	        function sendMessage() {
	        	return "Message sent!";
	        }
        }
})();
