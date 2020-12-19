const Discord = require("discord.js");
require("dotenv").config();
const ytdl = require("ytdl-core");

const client = new Discord.Client();

const pepperTestChannel = "789220591156199454";

client.login(process.env.CLIENT_TOKEN);

const imprisoned = [];

client.on("ready", () => {
  console.log("Hello");
});

client.on("message", async (message) => {
  motivationList = ["https://youtu.be/wnHW6o8WMas"];
  messageContent = message.content.toString();
  if (messageContent.toLowerCase() === "motivate") {
    const voiceChannel = message.member.voice.channel;
    if (voiceChannel) {
      voiceChannel
        .join()
        .then((connection) => {
          const dispatcher = connection.play(
            ytdl(
              motivationList[Math.floor(Math.random() * motivationList.length)],
              { filter: "audioonly" }
            )
          );
          dispatcher.on("start", () => {
            console.log("motivate.mp3 is now playing!");
          });

          dispatcher.on("finish", () => {
            console.log("motivate.mp3 has finished playing!");
            dispatcher.destroy();
            voiceChannel.leave();
          });

          // Always remember to handle errors appropriately!
          dispatcher.on("error", console.error);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      message.channel.send(
        "Please join a voice channel to enjoy what's coming next"
      );
    }
  }
});
