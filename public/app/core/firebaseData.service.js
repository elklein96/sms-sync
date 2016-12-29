
(function() {
  'use strict';

  angular
    .module('SmsSync.core')
    .factory('firebaseDataService', firebaseDataService);

  function firebaseDataService() {
    var root = firebase.database().ref();

    var service = {
      root: root,
      lastMsg: root.child('last-message'),
      lastReceived: root.child('last-received'),
      messages: root.child('messages')
    };

    return service;
  }

})();