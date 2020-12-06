"use strict";
const preRoles = require("../Data/general.json");
const embGen = require("../Classes/embedGenerator.js");
module.exports = {
  name: "ban",
  description: "Command to ban users from the Guild.",
  usage: `<prefix> ban`,
  access: "Moderators+",
  guildOnly: true,
  run(bot, message, args) {
    // Get the logs Channel
    const modLogs = message.guild.channels.cache.find(
      (channel) => channel.name === bot.defChan[message.guild.id]
    );

    // Define User
    const user = message.author;

    // Define Offender
    const offender = message.mentions.members.first();

    // Guild roles
    const guildRoles = message.member.roles.cache.map((r) => r.name);

    // Check to see if user has staff role
    if (
      !guildRoles.some((name) => preRoles.roleName.includes(name.toLowerCase()))
    ) {
      return message.channel.send(
        "This command is only for staff!, If you have staff permissions and you are seeing this in error, please join https://discord.gg/Tz3mRyJ and contact the developer!"
      );
    }
    // Define args for reason
    const reason = args.slice(1).join(" ");

    // Generate embed
    const embedGen = new embGen();
    const banMsg = embedGen.generatebanEmb(
      bot,
      user,
      message,
      offender,
      reason
    );
    const deniedBan = embedGen.generatebanDenyEmb(bot, user, message, offender);

    // Check if the offender has been tagged
    if (!offender) {
      message.reply("You need to tag the offender!");
    } // Check if the offender is bannable by the message author
    else if (
      message.member.roles.highest.comparePositionTo(offender.roles.highest) > 0
    ) {
      if (reason.length === 0) {
        message.reply(
          "Please give a reason to ban the user! `/ban <user> (reason)`"
        );
      } else {
        // If offender has been tagged, ask to confirm
        const filter = (m) =>
          m.content.includes("yes") && m.author.id === message.author.id;
        message
          .reply("Are you sure you want to ban " + offender.user.username)
          .then((reply) => {
            reply.channel
              .awaitMessages(filter, { max: 1, time: 5000, errors: ["time"] })
              .then((collected) => {
                let confirmation = collected.first();
                reply.delete();
                confirmation.delete();
                // If confirmed ban
                offender.ban();
                modLogs.send(banMsg).catch(console.error);
              })
              .catch((collected) => {
                message.reply("You didn't ban " + offender.user.username);
                return collected;
              });
          });
      }
    } else {
      message.reply("You are unable to ban this member");
      modLogs.send(deniedBan).catch(console.error);
    }
  },
};
