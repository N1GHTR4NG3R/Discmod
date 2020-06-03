"use strict";
const embGen = require("../Classes/embedGenerator.js");
const MemberInfoObj = require("../Classes/memberObj.js");
const tradeStation = require("../Data/tradeStation.js")
module.exports = async (bot, member) => {
	if(member.user.bot){ return }

	// Get the channel to output the log too
	const modLogs = member.guild.channels.cache.find(
        (ch) => ch.name === bot.defChan[member.guild.id]
	);

	// Get Member Information
	const MemberInfo = MemberInfoObj(bot, member);

	// Update Guild Information
	const updGuildMem = [MemberInfo.userGuildCount, MemberInfo.userGuildID];
	let sql = "UPDATE Guilds SET guild_member_count = ? WHERE guild_id = ?";
	bot.con.query(sql, updGuildMem, function (err, result) {
		if (err) {
			console.error(err, "There was an error Updating the guild memberCount! - guildMemberAdd.js Line 14");
		}
		return result;
	});

	// Update Member Information
	const updMem = {
		member_id: MemberInfo.userID,
		member_name: MemberInfo.userName,
		member_disc: MemberInfo.userDisc,
	};
	let memSql = "INSERT IGNORE INTO Members Set ?";
	bot.con.query(memSql, updMem, (err, result) => {
		if (err) {
			console.error(
				err,
				"There was an error Inserting the member into Members!"
			);
		}
		return result;
	});

	// Update GuildMembers Table
	const updGMT = {
		guild_id: MemberInfo.userGuildID,
		member_id: MemberInfo.userID,
	};
	let guiMemSQL = "INSERT IGNORE INTO Guildmembers SET ?";
	bot.con.query(guiMemSQL, updGMT, (err, result) => {
		if (err) {
			console.error(
				err,
				"There was an error Inserting the member into GuildMembers!"
			);
		}
		return result;
	});

	// Call the embed generator
	const embedGen = new embGen();
	const newMem = embedGen.generateMemJoin(
		bot,
		MemberInfo.userName,
		MemberInfo.userImg
	);
	const botWarning = embedGen.generateBotWarn(
		bot,
		MemberInfo.userName,
		MemberInfo.userImg
	);

	// Custom Welcome Script for TradeStation
	if (member.guild.id === "710462812161441793") {
		tradeStation(bot, member);
	}

	// Output the logs in an embed
	modLogs.send(newMem).catch(console.error);
	console.log(`${MemberInfo.userName} just joined ${MemberInfo.userGuildName}`);

	// And if the member is a bot
	if (MemberInfo.userName.bot === true) {
		modLogs.send(botWarning).catch(console.error);
		console.log("Bot Join Warning!");
	}
}