const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client();

const pepperTestChannel = "789220591156199454";

client.login(process.env.CLIENT_TOKEN);

client.on("ready", () => {
  console.log("Hello");
});

client.on("message", async (message) => {
  if (message.content.toString().toLowerCase() === "kutta") {
    const voiceChannel = message.member.voice.channel;
    if (voiceChannel) {
      voiceChannel
        .join()
        .then((connection) => {
          const dispatcher = connection.play("moan.mp3");
          dispatcher.on("start", () => {
            console.log("audio.mp3 is now playing!");
          });

          dispatcher.on("finish", () => {
            console.log("audio.mp3 has finished playing!");
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

  client.on("presenceUpdate", (oldPresence, newPresence) => {
    console.log(oldPresence);
    console.log(newPresence);
  });
});
