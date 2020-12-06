"use strict";
const preRoles = require("../Data/general.json");
const embGen = require("../Classes/embedGenerator.js");
module.exports = {
  name: "softban",
  description:
    "Softban users from the Guild. It bans then unbans them,\n therefore deleting any content they may have posted",
  guildOnly: true,
  usage: `<prefix>softban`,
  access: "Moderators+",
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

    // Define args for reason
    const reason = args.slice(1).join(" ");

    // Check to see if user has staff role
    if (
      !guildRoles.some((name) => preRoles.roleName.includes(name.toLowerCase()))
    ) {
      return message.channel.send("This command is for staff only!");
    }

    // Generate embed
    const embedGen = new embGen();
    const softMsg = embedGen.generatesoftBanEmb(
      bot,
      user,
      message,
      offender,
      reason
    );
    const deniedSoft = embedGen.generatesoftDenyEmb(
      bot,
      user,
      message,
      offender
    );

    // Check if the offender has been tagged
    if (!offender) {
      message.reply("You need to tag the offender!");
    } // Rolecheck to ensure those with lower roles cannot be softbanned
    else if (
      message.member.roles.highest.comparePositionTo(offender.roles.highest) > 0
    ) {
      if (reason.length === 0) {
        message.reply(
          `Please give a reason to softban the user! ${
            bot.prefix[message.guild.id]
          }softban <user> (reason)`
        );
      } else {
        // If offender has been tagged, ask to confirm
        const filter = (m) =>
          m.content.includes("yes") && m.author.id === message.author.id;
        message
          .reply("Are you sure you want to softban " + offender.user.username)
          .then((reply) => {
            reply.channel
              .awaitMessages(filter, { max: 1, time: 5000, errors: ["time"] })
              .then((collected) => {
                let confirmation = collected.first();
                reply.delete();
                confirmation.delete();
                // If confirmed softban
                offender.ban();
                modLogs.send(softMsg).catch(console.error);
                message.guild.members.unban(offender.id).catch(console.error);
              })
              .catch((collected) => {
                message.reply("You didn't softban " + offender.user.username);
                return collected;
              });
          });
      }
    } else {
      message.reply("You are unable to softban this member");
      modLogs.send(deniedSoft).catch(console.error);
    }
  },
};
