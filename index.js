'use strict';

let util = require('util');
let http = require('http');
let Bot = require('@kikinteractive/kik');

let bot = new Bot({
    username: 'oshsin', // The username you gave BotsWorth on Kik 
    apiKey: 'd15aa586-a0d7-45a7-b0a2-5e343ba36b77', // The API Key you can find on your profile on dev.kik.com
    baseUrl: 'https://oshsinbot.herokuapp.com/incoming' // THIS IS YOUR WEBHOOK! make sure this maches the web tunnel or host you have running 
});

// Send the configuration to kik to update the bot with the information above
bot.updateBotConfiguration();


bot.onTextMessage((message) => {

    message.reply(message.body);

    console.log(message.body);
});

bot.send(Bot.Message.picture('http://i.imgur.com/oalyVlU.jpg')
    .setAttributionName('Imgur')
    .setAttributionIcon('http://s.imgur.com/images/favicon-96x96.png'),
    'a.username');




bot.onScanDataMessage((message) => {

    message.reply(message.body);

    console.log(message.body);
});


bot.onPictureMessage((message) => {

    message.reply(message.body);

    console.log(message.body);
});


bot.onStickerMessage((message) => {

    message.reply(message.body);

    console.log(message.body);
});

bot.onLinkMessage((message) => {

    message.reply(message.body);

    console.log(message.body);
});


bot.onStartChattingMessage((message) => {
    bot.getUserProfile(message.from).then((user) => {
        message.reply(`Hey ${user.firstName}! Send me a message and I'll send it right back!`);
    })
});


bot.onVideoMessage((message) => {

    message.reply(message.body);

    console.log(message.body);
});


const PORT = process.env.PORT || 8080

let server = http.createServer(bot.incoming()).listen(PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`Server is listening on port ${PORT}`)
});
