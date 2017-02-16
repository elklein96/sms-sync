'use strict';

describe('SMS Factory', function() {
    var $firebaseArrayStub = sinon.stub();
    var $firebaseObjectStub = sinon.stub();
    var $bindToSpy = sinon.spy();
    var $saveSpy = sinon.spy();
    var $addSpy = sinon.spy();
    var $loadedSpy = sinon.spy();
    var $indexForSpy = sinon.spy();
    var $removeSpy = sinon.spy();
    var firebaseDataMock;

    beforeEach(module('SmsSync.core'));

    beforeEach(angular.mock.module(function($provide) {
        var firebaseObjectFunctions = {
            $bindTo: $bindToSpy,
            $save: $saveSpy
        };

        var firebaseArrayFunctions = {
            $add: $addSpy,
            $loaded: $loadedSpy
        };

        firebaseDataMock = {
            lastMsg: {
                content: 'Test sent message',
                recipientNum: '1234567890'
            },
            lastReceived: {
                content: 'Test received message',
                recipientNum: ''    
            },
            contacts: {
                'Test Contact': '1234568790'
            },
            messages: {
                "-KcWB_E91KFtZcmq_BDQ": {
                    "content": "This is a receieved message",
                    "recipientNum": ""
                },
                "-Kchz4Yqi8nG9djNwk9l" : {
                    "content": "This is a sent message",
                    "recipientNum": "1234567890"
                }
            }
        };

        $firebaseArrayStub.reset();
        $firebaseObjectStub.reset();
        $bindToSpy.reset();
        $saveSpy.reset();
        $addSpy.reset();
        $loadedSpy.reset();
        $indexForSpy.reset();
        $removeSpy.reset();

        $firebaseObjectStub.returns(firebaseObjectFunctions);
        $firebaseArrayStub.returns(firebaseArrayFunctions);

        $provide.value('$firebaseArray', $firebaseArrayStub);
        $provide.value('$firebaseObject', $firebaseObjectStub);
        $provide.value('firebaseData', firebaseDataMock);
    }));

    it('should put contacts in a $firebaseArray', inject(function(smsFactory) {
        smsFactory.getContacts();
        expect($firebaseArrayStub.calledOnce).to.be.true;
        expect($firebaseArrayStub.calledWith(firebaseDataMock.contacts)).to.be.true;
    }));

    it('should put conversations in a $firebaseArray', inject(function(smsFactory) {
        smsFactory.getConversations();
        expect($firebaseArrayStub.calledOnce).to.be.true;
        expect($firebaseArrayStub.calledWith(firebaseDataMock.messages)).to.be.true;
    }));

    it('should put conversations in a $firebaseArray', inject(function(smsFactory) {
        var testScope = {
            test: 'test'
        };

        smsFactory.startMsgListener(testScope);
        expect($firebaseObjectStub.calledTwice).to.be.true;
        expect($firebaseObjectStub.calledWith(firebaseDataMock.messages)).to.be.true;
        expect($firebaseObjectStub.calledWith(firebaseDataMock.lastReceived)).to.be.true;
        expect($bindToSpy.calledWith(testScope, 'messages')).to.be.true;
        expect($bindToSpy.calledWith(testScope, 'unread')).to.be.true;
    }));

    it('should send a message', inject(function(smsFactory) {
        // TODO
    }));

    it('should set a message as read', inject(function(smsFactory) {
        smsFactory.setMessageRead('Test Contact');
        expect($firebaseArrayStub.calledOnce).to.be.true;
        expect($firebaseArrayStub.calledWith(firebaseDataMock.lastReceived)).to.be.true;
        expect($loadedSpy.calledOnce).to.be.true;
    }));

    it('should determine contact is new', inject(function(smsFactory) {
        // TODO
    }));
});