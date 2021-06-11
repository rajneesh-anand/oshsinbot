"use strict";

let util = require("util");
let http = require("http");
let Bot = require("@kikinteractive/kik");
const request = require("request");

let bot = new Bot({
  username: "oshsin", // The username you gave BotsWorth on Kik
  apiKey: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77", // The API Key you can find on your profile on dev.kik.com
  baseUrl: "https://oshsinbot.herokuapp.com/incoming", //       https://22adfd582f23.ngrok.io/incoming' // THIS IS YOUR WEBHOOK! make sure this maches the web tunnel or host you have running
});

// Send the configuration to kik to update the bot with the information above
bot.updateBotConfiguration();

bot.onTextMessage((message) => {
  if (
    message.body === "Dog" ||
    message.body === "DOG" ||
    message.body === "dog"
  ) {
    request.post(
      {
        url: "https://api.kik.com/v1/message",
        auth: {
          user: "oshsin",
          pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
        },
        json: {
          messages: [
            {
              type: "picture",
              to: message.from,
              picUrl: "http://i.imgur.com/raa59KY.png",
              attribution: "camera",
            },
          ],
        },
      },
      function (err, res, body) {
        if (err) {
          console.log(`Error Info - ${err}`);
        }
        console.log(`${res.statusCode} === ${res.statusMessage}`);
      }
    );
  } else if (
    message.body === "Music" ||
    message.body === "MUSIC" ||
    message.body === "music"
  ) {
    let quiz_number = Math.floor(Math.random() * 11);
    let readQuiz = fs.readFileSync("allQuizzes.json", "utf8");
    var jsonContent = JSON.parse(readQuiz);

    let quiz_name = jsonContent[quiz_number]["title"];
    console.log(quiz_name);

    // for (var i = 0; i < jsonContent.length; i++) {
    //   titles[i] = jsonContent[i]["title"];
    // }

    request.post(
      {
        url: "https://api.kik.com/v1/message",
        auth: {
          user: "oshsin",
          pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
        },
        json: {
          messages: [
            {
              body: quiz_name,
              to: message.from,
              type: "text",
            },
          ],
        },
      },
      function (err, res, body) {
        if (err) {
          console.log(`Error Info - ${err}`);
        }
        console.log(` ${res.statusCode} === ${res.statusMessage}`);
      }
    );
  } else if (
    message.body === "PET" ||
    message.body === "Pet" ||
    message.body === "pet"
  ) {
    request.post(
      {
        url: "https://api.kik.com/v1/message",
        auth: {
          user: "oshsin",
          pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
        },
        json: {
          messages: [
            {
              type: "picture",
              to: message.from,
              picUrl: "http://i.imgur.com/iU3p0AN.png",
              attribution: "camera",
            },
          ],
        },
      },
      function (err, res, body) {
        if (err) {
          console.log(`Error Info - ${err}`);
        }
        console.log(` ${res.statusCode} === ${res.statusMessage}`);
      }
    );
  } else if (
    message.body === "KSLAYDHER" ||
    message.body === "Kslaydher" ||
    message.body === "Kslaydher"
  ) {
    request.post(
      {
        url: "https://api.kik.com/v1/message",
        auth: {
          user: "oshsin",
          pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
        },
        json: {
          messages: [
            {
              type: "picture",
              to: message.from,
              picUrl: "https://i.imgur.com/0rIO2Dl.png",
              attribution: "camera",
            },
          ],
        },
      },
      function (err, res, body) {
        if (err) {
          console.log(`Error Info - ${err}`);
        }
        console.log(` ${res.statusCode} === ${res.statusMessage}`);
      }
    );
  } else if (
    message.body === "Angel" ||
    message.body === "ANGEL" ||
    message.body === "angel"
  ) {
    request.post(
      {
        url: "https://api.kik.com/v1/message",
        auth: {
          user: "oshsin",
          pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
        },
        json: {
          messages: [
            {
              type: "picture",
              to: message.from,
              picUrl: "http://i.imgur.com/zDmcfew.png",
              attribution: "camera",
            },
          ],
        },
      },
      function (err, res, body) {
        if (err) {
          console.log(`Error Info - ${err}`);
        }
        console.log(` ${res.statusCode} === ${res.statusMessage}`);
      }
    );
  } else if (
    message.body === "Bye" ||
    message.body === "bye" ||
    message.body === "BYE"
  ) {
    bot.getUserProfile(message.from).then((user) => {
      request.post(
        {
          url: "https://api.kik.com/v1/message",
          auth: {
            user: "oshsin",
            pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
          },
          json: {
            messages: [
              {
                body: `You are awesome ${user.firstName}. Stay Safe and Be Healthy `,
                to: message.from,
                type: "text",
              },
            ],
          },
        },
        function (err, res, body) {
          if (err) {
            console.log(`Error Info - ${err}`);
          }
          console.log(` ${res.statusCode} === ${res.statusMessage}`);
        }
      );
    });
  } else {
    request.post(
      {
        url: "https://api.kik.com/v1/message",
        auth: {
          user: "oshsin",
          pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
        },
        json: {
          messages: [
            {
              body: message.body,
              to: message.from,
              type: "text",
            },
          ],
        },
      },
      function (err, res, body) {
        if (err) {
          console.log(`Error Info - ${err}`);
        }
        console.log(` ${res.statusCode} === ${res.statusMessage}`);
      }
    );
  }
});

bot.onScanDataMessage((message) => {
  message.reply(message.body);

  console.log(message.body);
});

bot.onPictureMessage((message) => {
  console.log(`On picture message`);

  request.post(
    {
      url: "https://api.kik.com/v1/message",
      auth: {
        user: "oshsin",
        pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
      },
      json: {
        messages: [
          {
            type: "picture",
            to: message.from,
            picUrl: "http://i.imgur.com/raa59KY.png",
            attribution: "camera",
          },
        ],
      },
    },
    function (err, res, body) {
      if (err) {
        console.log(`Error Info - ${err}`);
      }
      console.log(` ${res.statusCode} === ${res.statusMessage}`);
    }
  );
});

bot.onStickerMessage((message) => {
  console.log(`On sticker message`);

  request.post(
    {
      url: "https://api.kik.com/v1/message",
      auth: {
        user: "oshsin",
        pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
      },
      json: {
        messages: [
          {
            type: "sticker",
            to: message.from,
            stickerPackId: "memes",
            stickerUrl:
              "http://cards-sticker-dev.herokuapp.com/stickers/memes/okay.png",
          },
        ],
      },
    },
    function (err, res, body) {
      if (err) {
        console.log(`Error Info - ${err}`);
      }
      console.log(` ${res.statusCode} === ${res.statusMessage}`);
    }
  );
});

bot.onLinkMessage((message) => {
  console.log(`On link message`);

  request.post(
    {
      url: "https://api.kik.com/v1/message",
      auth: {
        user: "oshsin",
        pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
      },
      json: {
        messages: [
          {
            type: "link",
            to: message.from,
            title: "My Webpage",
            text: "Some text to display",
            url: "https://www.bbc.com/news/world-us-canada-57194883",
            picUrl:
              "https://ichef.bbci.co.uk/news/976/cpsprodpb/C865/production/_118610315_wvtf1.jpg",
            attribution: {
              name: "My App",
              iconUrl:
                "https://ichef.bbci.co.uk/news/976/cpsprodpb/C865/production/_118610315_wvtf1.jpg",
            },
            noForward: true,
            kikJsData: { key: "value" },
          },
        ],
      },
    },
    function (err, res, body) {
      if (err) {
        console.log(`Error Info - ${err}`);
      }
      console.log(` ${res.statusCode} === ${res.statusMessage}`);
    }
  );
});

bot.onStartChattingMessage((message) => {
  bot.getUserProfile(message.from).then((user) => {
    message.reply(
      `Hey ${user.firstName}. Nice to meet you. I hope this message finds you well. Send me a message and I'll send it right back.`
    );
  });
});

bot.onVideoMessage((message) => {
  console.log(`On video message`);

  request.post(
    {
      url: "https://api.kik.com/v1/message",
      auth: {
        user: "oshsin",
        pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
      },
      json: {
        messages: [
          {
            type: "video",
            to: message.from,
            videoUrl:
              "https://static.videezy.com/system/resources/previews/000/053/979/original/Stray_Dog_Sitting_On_The_Grass_3.mp4",
            muted: true,
            autoplay: false,
          },
        ],
      },
    },
    function (err, res, body) {
      if (err) {
        console.log(`Error Info - ${err}`);
      }
      console.log(` ${res.statusCode} === ${res.statusMessage}`);
    }
  );
});

let PORT = process.env.PORT || 8080;

let server = http.createServer(bot.incoming()).listen(PORT, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`Server is listening on port ${PORT}`);
});

// 'use strict';

// // We are gonna need to import the http library and the kikBot SDK
// // so that we can use them to make our bot work
// let util = require('util');
// let http = require('http');
// let Bot = require('@kikinteractive/kik');

// // We are first gonna create a new bot object with all of
// // the information we just filled in on dev.kik.com
// let bot = new Bot({
//     username: 'oshsin', // The username you gave BotsWorth on Kik
//     apiKey: 'd15aa586-a0d7-45a7-b0a2-5e343ba36b77', // The API Key you can find on your profile on dev.kik.com
//     baseUrl: 'https://fa4552053a97.ngrok.io/incoming' // THIS IS YOUR WEBHOOK! make sure this maches the web tunnel or host you have running
// });

// // Send the configuration to kik to update the bot with the information above
// bot.updateBotConfiguration();

// // The onTextMessage(message) handler. This is run everytime your bot gets a message.
// // The method takes a message object as a parameter.
// bot.onTextMessage((message) => {

//     // We take the message and call the reply method with the body of the message we recieved
//     // this is the "echo" functionality of our bot
//     message.reply(message.body);

//     // print out the message so we can see on the server what's being sent
//     console.log(message.body);
// });

// bot.send(Bot.Message.picture('http://i.imgur.com/oalyVlU.jpg')
//     .setAttributionName('Imgur')
//     .setAttributionIcon('http://s.imgur.com/images/favicon-96x96.png'),
//     'a.username');

// // We want to set up our start chatting message. This will be the first message the user gets when they start
// // chatting with your bot. This message is only sent once.
// bot.onStartChattingMessage((message) => {
//     bot.getUserProfile(message.from)
//         .then((user) => {
//             message.reply(`Hey ${user.firstName}! I'm your new echo bot. Send me a message and I'll send it right back!`);
//         });
// });

// // Set up your server and start listening
// let server = http
//     .createServer(bot.incoming())
//     .listen(8000, (err) => {
//         if (err) {
//             return console.log('something bad happened', err)
//         }

//         console.log(`server is listening on 8000`)
//     });
