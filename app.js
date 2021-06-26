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

// baseUrl: "https://cd752fc2bd53.ngrok.io/incoming",
// baseUrl: "https://oshsinbot.herokuapp.com/incoming",

let bot = new Bot({
  username: "oshsin", // The username you gave BotsWorth on Kik
  apiKey: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
  baseUrl: "https://oshsinbot.herokuapp.com/incoming",
});

// Chat array

const chatArray = [
  {
    q: "Hi",
    a: "Hey, What's up ? I hope this message finds you well. Use the keyword Music for Music Trivia Quiz",
  },
  {
    q: "hi",
    a: "Hey, What's up ? I hope this message finds you well. Use the keyword Music for Music Trivia Quiz",
  },
  {
    q: "Hello",
    a: "Hey, What's up ? I hope this message finds you well. Use the keyword Music for Music Trivia Quiz",
  },
  {
    q: "hello",
    a: "Hey, What's up ? I hope this message finds you well. Use the keyword Music for Music Trivia Quiz",
  },
  {
    q: "Bye",
    a: "It's nice to talk to you. Stay Safe and Be Happy .. Bye & Take Care \n\nfrom OSHOA .. ",
  },
];

// Send the configuration to kik to update the bot with the information above
bot.updateBotConfiguration();

var answer_number = "";
var answer_name = "";
var setTriviaFlag = false;

bot.onTextMessage((message) => {
  var chatResult = chatArray.find((x) => x.q === message.body);
  console.log(chatResult);

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
          console.log(err);
        }
      }
    );
  } else if (
    message.body === "Music" ||
    message.body === "MUSIC" ||
    message.body === "music"
  ) {
    setTriviaFlag = true;
    let quiz_number = Math.floor(Math.random() * 6);
    let readQuiz = fs.readFileSync("music.json", "utf8");
    var jsonContent = JSON.parse(readQuiz);

    let quiz_name = jsonContent[quiz_number]["question"];
    answer_number = jsonContent[quiz_number]["answer"].split("-")[0];
    answer_name = jsonContent[quiz_number]["answer"].split("-")[1];

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
          console.log(err);
        }
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
              muted: true,

              //   attribution: "camera",
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
    setTriviaFlag = false;
  } else if (!chatResult) {
    if (setTriviaFlag) {
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
                muted: true,

                //   attribution: "camera",
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
                body: "I'm a Bot , a stupid bot .. Sometimes it's hard to understamd human instructions.",
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
    setTriviaFlag = false;
  } else {
    console.log(chatResult);
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
              body: chatResult.a,
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
  console.log(`on start chatting request ---------- > ${message}`);

  try {
    request.get({
      url: "https://api.kik.com/v1/message",
      auth: {
        user: "oshsin",
        pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
      },

      json: {
        messages: [
          {
            type: "text",
            body: "Nice to meet you. I hope this message finds you well :)",
            to: message.from,
          },
        ],
      },
    });
  } catch (error) {
    console.log(`on scan data error ---------- > ${error}`);
  }
  // });
});

// On Picture request

const cloudinaryUpload = (file) => cloudinary.uploader.upload(file);

bot.onPictureMessage(async (message) => {
  console.log(`on picture request ---------- > `);

  try {
    // const uploadResult = await cloudinaryUpload(message.picUrl);

    // bot.getUserProfile(message.from).then((user) => {
    //   const result = cloudinary.image(
    //     `${uploadResult.public_id}.${uploadResult.format}`,
    //     {
    //       transformation: [
    //         { effect: "cartoonify" },
    //         { radius: "max" },
    //         { effect: "outline:100", color: "lightblue" },
    //         { background: "lightblue" },
    //         { height: 300, crop: "scale" },
    //         {
    //           overlay: {
    //             font_family: "Verdana",
    //             font_size: 16,
    //             // font_weight: "bold",
    //             text: `${user.firstName} ${user.lastName} `,
    //           },
    //         },
    //         { flags: "layer_apply", gravity: "north_east", y: "0.03" },
    //       ],
    //     }
    //   );
    //   // console.log(result);
    //   const dom = new JSDOM(result, { includeNodeLocations: true });
    //   // console.log(dom.window.document.querySelector("img").getAttribute("src"));
    //   const cusImg = dom.window.document
    //     .querySelector("img")
    //     .getAttribute("src");

    //   request.post({
    //     url: "https://api.kik.com/v1/message",
    //     auth: {
    //       user: "oshsin",
    //       pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
    //     },
    //     json: {
    //       messages: [
    //         {
    //           type: "picture",
    //           to: message.from,
    //           picUrl: cusImg,
    //           // attribution: "camera",
    //         },
    //       ],
    //     },
    //   });
    // });

    request.post({
      url: "https://api.kik.com/v1/message",
      auth: {
        user: "oshsin",
        pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
      },
      json: {
        messages: [
          {
            body: "Oshsin not able to detect face. Please try another photo .",
            to: message.from,
            type: "text",
            // attribution: "camera",
          },
        ],
      },
    });
  } catch (error) {
    console.log(`on picture ---------- > ${error}`);

    request.post({
      url: "https://api.kik.com/v1/message",
      auth: {
        user: "oshsin",
        pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
      },
      json: {
        messages: [
          {
            body: "Oshsin not able to detect face. Please try another photo .",
            to: message.from,
            type: "text",
            // attribution: "camera",
          },
        ],
      },
    });
  }
});

bot.onStickerMessage((message) => {
  console.log(`on start chatting request ---------- > ${message}`);
  try {
    request.get({
      url: "https://api.kik.com/v1/message",
      auth: {
        user: "oshsin",
        pass: "d15aa586-a0d7-45a7-b0a2-5e343ba36b77",
      },
      json: {
        messages: [
          {
            type: "text",
            body: "Nice to meet you. I hope this message finds you well :)",
            to: message.from,
          },
        ],
      },
    });
  } catch (error) {
    console.log(`on sticker error ---------- > ${error}`);
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

bot.onStartChattingMessage((message) => {
  console.log(`on start chatting request ---------- > ${message}`);
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
            type: "text",
            body: "Nice to meet you. I hope this message finds you well :)",
            to: message.from,
            chatId: message.chatId,
          },
        ],
      },
    });
  } catch (error) {
    console.log(`on start chatting error ---------- > ${error}`);
  }
});

bot.onVideoMessage((message) => {
  console.log("on video message request ---------- >");
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

http.createServer(bot.incoming()).listen(PORT, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`Server is listening on port ${PORT}`);
});
