"use strict";
const embGen = require("../Classes/embedGenerator.js");
module.exports = {
  name: "invite",
  description: "Create a temporary invite and the bot will DM it to you.",
  usage: `<prefix>invite`,
  access: "Members",
  guildOnly: true,
  run(bot, message, args) {
    // Get the logs Channel
    const modLogs = message.guild.channels.cache.find(
      (channel) => channel.name === bot.defChan[message.guild.id]
    );

    // Define User
    const user = message.author;

    //Discord URL for Invite Code
    const dUrl = "https://discord.gg/";

    // Define args as reasons
    const reason = args.join(" ");

    // If no reason given, Don't allow an invite!
    if (reason.length === 0) {
      message.reply(
        `Please give a reason to create an invite! ${
          bot.prefix[message.guild.id]
        }invite (reason)`
      );
    } else {
      // Create Invite
      message.channel
        .createInvite({
          maxAge: 86400,
          maxUses: 10,
          unique: true,
        })
        .then((invite) => {
          // Generate embed
          const embedGen = new embGen();
          const invMsg = embedGen.generatetempInvEmb(
            bot,
            user,
            message,
            reason,
            dUrl,
            invite
          );

          // Output to modLogs
          modLogs.send(invMsg).catch(console.error);
          // Send directly to user in DM
          message.author.send(invMsg);
        })
        .catch(console.error);
    }
  },
};
