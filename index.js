"use strict";
const util = require("util");
const http = require("http");
const Bot = require("@kikinteractive/kik");
const request = require("request");
const fs = require("fs");
const axios = require("axios").default;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dlywo5mxn",
  api_key: "436327778941833",
  api_secret: "yZq5LpiY-YG_LJxixu3bX0e2euU",
});

// baseUrl: "https://oshsinbot.herokuapp.com/incoming",
//baseUrl: "https://0dfd18caad8d.ngrok.io/incoming",

let bot = new Bot({
  username: "oshsin",
  apiKey: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
  baseUrl: "https://oshsinbot.herokuapp.com/incoming",
});

bot.updateBotConfiguration();

bot.onTextMessage((message) => {
  console.log(`on text message ---------- >`);

  try {
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
              chatId: message.chatId,
              type: "text",
              body: "Hello On Text Message",
              to: message.from,
            },
          ],
        },
      },
      function (err, res, body) {
        if (err) {
          console.log(err);
        }
      }
    );
  } catch (error) {
    console.log(`on text message error ---------- > ${error}`);
  }
});

bot.onPictureMessage((message) => {
  console.log(`on picture message error ---------- >`);

  try {
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
              chatId: message.chatId,
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
          console.log(err);
        }
      }
    );
  } catch (error) {
    console.log(`on sticker message error ---------- > ${error}`);
  }
});

bot.onVideoMessage((message) => {
  console.log(`on video message error ---------- >`);

  try {
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
              chatId: message.chatId,
              type: "video",
              to: message.from,
              videoUrl:
                "https://static.videezy.com/system/resources/previews/000/053/979/original/Stray_Dog_Sitting_On_The_Grass_3.mp4",
              muted: true,
              autoplay: true,
            },
          ],
        },
      },
      function (err, res, body) {
        if (err) {
          console.log(err);
        }
      }
    );
  } catch (error) {
    console.log(`on video message error ---------- > ${error}`);
  }
});

bot.onStickerMessage((message) => {
  console.log(`on sticker message ---------- >`);

  try {
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
              chatId: message.chatId,
              type: "sticker",
              stickerPackId: "memes",
              stickerUrl:
                "http://cards-sticker-dev.herokuapp.com/stickers/memes/okay.png",
            },
          ],
        },
      },
      function (err, res, body) {
        if (err) {
          console.log(err);
        }
      }
    );
  } catch (error) {
    console.log(`on sticker message error ---------- > ${error}`);
  }
});

bot.onLinkMessage((message) => {
  console.log("on link request ---------- >");

  try {
    request.post({
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
            url: "http://google.com",
            picUrl: "http://i.imgur.com/raa59KY.png",
            attribution: {
              name: "My App",
              iconUrl: "http://i.imgur.com/raa59KY.png",
            },
            noForward: true,
            kikJsData: { key: "value" },
          },
        ],
      },
    });
  } catch (error) {
    console.log(`on link error ---------- > ${error}`);
  }
});

bot.onScanDataMessage((message) => {
  console.log(`on scan data request ---------- > `);

  try {
    request.post(
      {
        url: "https://api.kik.com/v1/code",
        auth: {
          user: "oshsin",
          pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
        },
        json: {
          type: "scan-data",
          data: "IdleMinds",
        },
      },
      function (err, res, body) {
        if (err) {
          console.log(err);
        }
      }
    );
  } catch (error) {
    console.log(`on scan data error ---------- > ${error}`);
  }
});

bot.onStartChattingMessage((message) => {
  console.log(`on start chatting request ---------- > ${message}`);

  bot.getUserProfile(message.from).then((user) => {
    try {
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
                chatId: message.chatId,
                type: "start-chatting",
                body: `Hey ${user.firstName}!`,
                to: message.from,
                chatId: message.chatId,
              },
            ],
          },
        },
        function (err, res, body) {
          if (err) {
            console.log(err);
          }
        }
      );
    } catch (error) {
      console.log(`on start chatting error ---------- > ${error}`);
    }
  });
});

let PORT = process.env.PORT || 8080;

http.createServer(bot.incoming()).listen(PORT, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`Server is listening on port ${PORT}`);
});
