"use strict";

const util = require("util");
const http = require("http");
const Bot = require("@kikinteractive/kik");
const request = require("request");
const fs = require("fs");

let bot = new Bot({
  username: "oshsin", // The username you gave BotsWorth on Kik
  apiKey: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
  baseUrl: "https://oshsinbot.herokuapp.com/incoming",
});

// Send the configuration to kik to update the bot with the information above
bot.updateBotConfiguration();
var answer_number = "";
var answer_name = "";

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
    let quiz_number = Math.floor(Math.random() * 6);
    let readQuiz = fs.readFileSync("music.json", "utf8");
    var jsonContent = JSON.parse(readQuiz);

    let quiz_name = jsonContent[quiz_number]["question"];
    answer_number = jsonContent[quiz_number]["answer"].split("-")[0];
    answer_name = jsonContent[quiz_number]["answer"].split("-")[1];
    console.log(quiz_name);
    console.log(answer_name);
    console.log(answer_number);

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
  } else if (message.body == answer_number || message.body === answer_name) {
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
              videoUrl: "https://i.imgur.com/5VFTSZG.mp4",
              autoplay: true,
              loop: true,

              //   attribution: "camera",
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
  } else if (message.body != "Bye" && message.body != answer_number) {
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
              videoUrl: "https://i.imgur.com/ED5InCq.mp4",
              autoplay: true,
              loop: true,

              //   attribution: "camera",
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
                body: `You are awesome ${user.firstName} :) \n Stay Safe and Be Healthy \n Best Wishes from Oshoa ..... `,
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
              body: "Hello" + "<br>" + message.body,
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
