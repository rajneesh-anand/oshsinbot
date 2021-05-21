'use strict';

// We are gonna need to import the http library and the kikBot SDK 
// so that we can use them to make our bot work
let util = require('util');
let http = require('http');
let Bot = require('@kikinteractive/kik');

// We are first gonna create a new bot object with all of 
// the information we just filled in on dev.kik.com
let bot = new Bot({
    username: 'OshSin', // The username you gave BotsWorth on Kik 
    apiKey: 'd15aa586-a0d7-45a7-b0a2-5e343ba36b77', // The API Key you can find on your profile on dev.kik.com
    baseUrl: 'https://oshsinbot.herokuapp.com/incoming' // THIS IS YOUR WEBHOOK! make sure this maches the web tunnel or host you have running 
});

// Send the configuration to kik to update the bot with the information above
bot.updateBotConfiguration();

// The onTextMessage(message) handler. This is run everytime your bot gets a message. 
// The method takes a message object as a parameter.
bot.onTextMessage((message) => {

    // We take the message and call the reply method with the body of the message we recieved 
    // this is the "echo" functionality of our bot 
    message.reply(message.body);

    // print out the message so we can see on the server what's being sent 
    console.log(message.body);
});

// We want to set up our start chatting message. This will be the first message the user gets when they start 
// chatting with your bot. This message is only sent once. 
bot.onStartChattingMessage((message) => {
    bot.getUserProfile(message.from)
        .then((user) => {
            message.reply(`Hey ${user.firstName}! I'm your new echo bot. Send me a message and I'll send it right back!`);
        });
});

// Set up your server and start listening
let server = http
    .createServer(bot.incoming())
    .listen(8000, (err) => {
        if (err) {
            return console.log('something bad happened', err)
        }

        console.log(`server is listening on 8000`)
    });
