"use strict";
const embGen = require("../Classes/embedGenerator.js");
const MemberInfoMethod = require("../Classes/memberObj.js");

module.exports = async (bot, member) => {
	// Get the channel to output the log too
	const modLogs = member.guild.channels.cache.find(
        (ch) => ch.name === bot.defChan[member.guild.id]
	);

	// Get Member Information
	const MemberInfo = MemberInfoMethod(bot, member);

	// Update Guild Information.
	const updGuildMem = [MemberInfo.userGuildCount, MemberInfo.userGuildID];
	let sql = `UPDATE Guilds SET guild_member_count = ? WHERE guild_id = ?`;
	bot.con.query(sql, updGuildMem, function (err, result) {
		if (err) {
			console.error(err, "There was an error Updating the guild in the DB!");
		}
		console.log(`Removed ${MemberInfo.userName} from ${MemberInfo.userGuildName}`);
		return result;
	});

	const embedGen = new embGen();
	const oldMem = embedGen.generateMemLeave(
		bot,
		MemberInfo.userName,
		MemberInfo.userImg,
	);

	// Output the log
	if (member.user.bot) {
		console.log(`${member.user.tag} has left ${MemberInfo.userGuildName}`);
	} else {
		modLogs.send(oldMem).catch(console.error);
	}
};