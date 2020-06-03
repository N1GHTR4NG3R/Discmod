"use strict";
const preRoles = require("../Data/general.json");
const embGen = require("../Classes/embedGenerator.js");
module.exports = {
	name: "kick",
	description: "Command to kick users from the Guild.",
	guildOnly: true,
	usage: "/kick",
	access: "Moderators+",
	run(bot, message, args) {
		// Get the logs Channel
		// Find logs Channel
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
			return message.channel.send("This command is only for staff!");
		}

		// Define args for reason
		const reason = args.slice(1).join(" ");

		// Generate embed
		const embedGen = new embGen();
		const kickMsg = embedGen.generatekickEmb(bot, user, message, offender, reason);
		const deniedKick = embedGen.generatedenyEmb(bot, user, message, offender);

		// Check if the offender has been tagged
		if (!offender) {
			message.reply("You need to tag the offender!");
		} // Rolecheck to ensure those with lower roles cannot be kicked
		else if (
			message.member.roles.highest.comparePositionTo(offender.roles.highest) > 0
		) {
			if (reason.length === 0) {
				message.reply(
					"Please give a reason to kick the user! `/kick (user) (reason)`"
				);
			} else {
				// If offender has been tagged, ask to confirm
				const filter = (m) => m.content.includes("yes") && m.author.id === message.author.id;
				message
					.reply("Are you sure you want to kick " + offender.user.username)
					.then((reply) => {
						reply.channel
							.awaitMessages(filter, { max: 1, time: 5000, errors: ["time"] })
							.then((collected) => {
								let confirmation = collected.first();
								reply.delete();
								confirmation.delete();
								// If confirmed Kick
								offender.kick();
								modLogs.send(kickMsg).catch(console.error);
							})
							.catch((collected) => {
								message.reply("You didn't kick " + offender.user.username);
								return collected;
							});
					});
			}
		} else {
			message.reply("You are unable to kick this member");
			modLogs.send(deniedKick).catch(console.error);
		}
	},
};