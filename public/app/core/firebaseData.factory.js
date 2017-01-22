(function() {
    'use strict';

    angular
        .module('SmsSync.core')
        .factory('firebaseData', firebaseData);

    function firebaseData() {
        var root = firebase.database().ref();

        var service = {
            root: root,
            lastMsg: root.child('last-message'),
            lastReceived: root.child('last-received'),
            messages: root.child('messages'),
            contacts: root.child('contacts')
        };

        return service;
    }

})();