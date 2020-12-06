"use strict";
const embGen = require("../Classes/embedGenerator.js");
module.exports = {
  name: "perminvite",
  description: "Create a permanent invite and the bot will DM it to you.",
  guildOnly: true,
  usage: `<prefix>perminvite`,
  access: "Members",
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
        `Please give a reason to create a permanent invite! ${
          bot.prefix[message.guild.id]
        }perminvite (reason)`
      );
    } else {
      // Create Invite
      message.channel
        .createInvite({
          maxAge: 0,
          maxUses: 0,
          unique: true,
        })
        .then((invite) => {
          // Define invite embed
          const embedGen = new embGen();
          const permInvite = embedGen.generatepermInviteEmb(
            bot,
            user,
            message,
            reason,
            dUrl,
            invite
          );
          modLogs.send(permInvite).catch(console.error);
          message.author.send(permInvite);
        })
        .catch(console.error);
    }
  },
};
