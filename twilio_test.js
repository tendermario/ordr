//Initialize a REST client in a single line:
var client = require('twilio')('ACc9db17ac92a9765e5bc23cb5d96d8931', '86ce6796f1daee631d27163b878b96bb');

// Use this convenient shorthand to send an SMS:
client.sendSms({
    to:'+16048456782',
    from:'+17787713963',
    body:'ahoy hoy! Testing Twilio and node.js'
}, function(error, message) {
    if (!error) {
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.');
        console.log(error);
    }
});

