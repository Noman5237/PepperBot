const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client();

const pepperTestChannel = "789220591156199454";

client.login(process.env.CLIENT_TOKEN);

const imprisoned = [];

client.on("ready", () => {
  console.log("Hello");
});

client.on("message", async (message) => {
  messageContent = message.content.toString();
  if (messageContent.toLowerCase() === "kutta") {
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

  if (messageContent.startsWith(".imprison")) {
    for (const [id, user] of message.mentions.members) {
      console.log(id);
      imprisoned.push(id);
      // user.voice.setChannel("789485989592170546");
    }
    console.log(imprisoned);
  }
});

client.on("voiceStateUpdate", (oldState, newState) => {
  const user = newState.member;
  if (user.id in imprisoned) {
    newState.setChannel("789485989592170546");
  }
});
