$(document).ready(function() {

    // https://freebusy.io/pick-a-time
    var pickATimeUrl = 'https://freebusy.io/pick-a-time';

    // following variable should be passed from the plugins host (ie https://www.gotomeeting.com/)
    var attendeesMessage = '{ "attendees" : [' +
        '{ "email":"m.heath66@gmail.com"},' +
        '{ "email":"michael@freebusy.io"},' +
        '{ "email":"stefan@freebusy.io"} ],' +
        '"invitee":"michael@freebusy.io",' +
        '"messageType" : "invite" }';

    var handshakeMessage = '{ "messageType" : "handshake" }';

    window.addEventListener("message", receiveMessage, false);

    var pickATimeWindow;
    var interval;

    $('#openWindow').on('click',function(event){
        pickATimeWindow  = window.open(pickATimeUrl, 'freebusy', 'width=768,height=550');
        interval = setInterval(sendHandshakeMessage, 1000);

    });

    function sendHandshakeMessage(){

        pickATimeWindow.postMessage(JSON.parse(handshakeMessage), pickATimeUrl);
        console.log('sendHandshakeMessage');

        window.clearInterval(interval);
    }

    function sendAttendeesMessage(){
        pickATimeWindow.postMessage(JSON.parse(attendeesMessage), pickATimeUrl);
    }

    function receiveMessage(event){
        // Do we trust the sender of this message?  (might be
        // different from what we originally opened, for example).
        if (event.origin !== pickATimeUrl){
            console.log('Pick-A-Time event origin invalid.');
            return;
        }

        // TODO: Check message type
        console.log('messageType: ' + getMessageType(handshakeMessage));

        // TODO: Do something with the message
        // if handshake confirm, clearInterval, sendAttendeesMessage
        
        // Send the attendees
        console.log('messageType: ' + getMessageType(attendeesMessage));

    }

    function getMessageType(message){
        var message = JSON.parse(message);
        console.log(message);
        return message.messageType;
    }

});
