$(function() {
    var sdata;
    var sel = {
        name: undefined,
        number: undefined
    };
    var config = {
        databaseURL: "https://sms-sync-89b46.firebaseio.com",
    };
    firebase.initializeApp(config);
    
    var database = firebase.database();
    var msg = database.ref('messages');

    msg.once('value', function(snapshot) {
        sdata = snapshot;
        for (var key in snapshot.val()) {
            $(".sidebar-nav").append('<li><a href="#">' + key + '</a></li>');
        }
    });

    msg.on('value', function(snapshot) {
        sdata = snapshot;
        displayMsg();
    });

    $(document).on("click", "li", function() {
        sel.name = $(this).text();
        $("#recipient").text(sel.name);
        displayMsg();
    });

    $(document).on("click", "#send", function() { 
        var msg = $('#message-input').val();
        if (msg.length > 0) {
            $('#message-input').val('');
            sendMsg(msg, sel.number);
        }
    });

    $(document).on("keypress", "#message-input", function(e) {
    	if (e.which == 13){
            var msg = $('#message-input').val();
            if (msg.length > 0) {
                $('#message-input').val('');
                sendMsg(msg, sel.number);
            }
        }
    });

    function displayMsg() {
        var messageStr;
        $('#chat-wrapper').empty();
        if (sel.name != undefined) {
            data = sdata.val()[sel.name];
            for (var i in data) {
                if (data[i].recipientNum === "") {
                    messageStr = '<p class="message received">' + data[i].content + '</p><br>';
                } else {
                    sel.number = data[i].recipientNum; 
                    messageStr = '<p class="message sent">' + data[i].content + '</p><br>';
                }
                $('#chat-wrapper').append(messageStr);
            }
            $('#chat-wrapper')[0].scrollTop = $('#chat-wrapper')[0].scrollHeight;
            $('#send').blur();
        }
    }

    function sendMsg(content, recipientNum) {
        var msgData = {
            content: content,
            recipientNum: recipientNum
        };

        var newMsgKey = database.ref().child('messages/' + sel.name).push().key;
        var updates = {};
        updates['/messages/' + sel.name + '/' + newMsgKey] = msgData;
        updates['/last-message/'] = msgData;
        database.ref().update(updates);
    }
});