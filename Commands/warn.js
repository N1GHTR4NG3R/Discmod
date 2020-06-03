'use strict'
const preRoles = require("../Data/general.json");
const embGen = require("../Classes/embedGenerator.js");

module.exports = {
	name: "warn",
	description: "Command to warn users in the Guild.",
	usage: "/warn",
	access: "Moderators+",
	guildOnly: true,
	run(bot, message, args) {
    // Get the logs Channel
		const modLogs = message.guild.channels.cache.find(
			(channel) => channel.name === bot.defChan[message.guild.id]
    );
    
    // Get User
		const user = message.author;

		// Get Offender
    const offender = message.mentions.members.first();
  
    // Get Staff roles
    const guildRoles = message.member.roles.cache.map((r) => r.name);
    
    // Define args for reason
		const reason = args.slice(1).join(" ");

		// Check to see if user has staff role
		if (
			!guildRoles.some((name) => preRoles.roleName.includes(name.toLowerCase()))
		) {
      message.channel.send("This command is only for staff!");
      modLogs.send(`${user} attempted to warn ${offender}`);
    }

    // Generate embed
		const embedGen = new embGen();
    const warnMsg = embedGen.generateUserWarn(bot, user, message, offender, reason);
    
    // Check if the offender has been tagged
		if (!offender) {
			message.reply("You need to tag the offender!");
		}// Check if the offender is bannable by the message author
		else if (message.member.roles.highest.comparePositionTo(offender.roles.highest) > 0) {
			if (reason.length === 0) {
        message.reply(`Please give a reason to warn the user! ${bot.prefix[message.guild.id]}warn (user) (reason)`)
      }else {
        // If offender has been tagged, ask to confirm
        const filter = (m) => m.content.includes("yes") && m.author.id === message.author.id;
        message.reply("Are you sure you want to warn " + offender.user.username)
          .then((reply) => {
            reply.channel
              .awaitMessages(filter, { max: 1, time: 5000, errors: ["time"] })
              .then((collected) => {
                let confirmation = collected.first();
                reply.delete();
                confirmation.delete();
                // If confirmed warn
                const updGID =  offender.guild.id
                const updMem = offender.user.id
                let guiMemSQL = "UPDATE Guildmembers SET warning_points=warning_points+1 WHERE guild_id = ? AND member_id = ?";
                bot.con.query(guiMemSQL, [updGID, updMem], (err, result) => {
                  if (err) {
                    console.error(err.sqlMessage, "Unable to add warning point to DB! - warn.js line 61");
                  }
                  return result;
                });
                 modLogs.send(warnMsg).catch(console.error);
              })
              .catch((collected) => {
                message.reply("You didn't warn " + offender.user.username);
                return collected;
              });
          });
      }
    }
  }
}