"use strict";
const embGen = require("../Classes/embedGenerator.js");
const MemberInfoObj = require("../Classes/memberObj.js");
module.exports = async (bot, member) => {
  // Don't output if another Bot joins
  if (member.user.bot) {
    return;
  }

  // Get the channel to output the log too
  const modLogs = member.guild.channels.cache.find(
    (ch) => ch.name === "welcome"
  );

  // Get Member Information
  const MemberInfo = MemberInfoObj(bot, member);

  // Update Guild Information
  const updGuildMem = [MemberInfo.userGuildCount, MemberInfo.userGuildID];
  let sql =
    "UPDATE IGNORE Guilds SET guild_member_count = ? WHERE guild_id = ?";
  bot.con.query(sql, updGuildMem, function (err, result) {
    if (err) {
      console.error(
        err,
        "There was an error Updating the member count in the DB! - guildMemberAdd.js line 19"
      );
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
        "There was an error Inserting the member into the database! - guildMemberAdd.js line 38!"
      );
    }
    return result;
  });

  // Update GuildMembers Table
  const updGMT = {
    guild_id: MemberInfo.userGuildID,
    member_id: MemberInfo.userID,
  };
  let guiMemSQL = "INSERT IGNORE INTO GuildMember SET ?";
  bot.con.query(guiMemSQL, updGMT, (err, result) => {
    if (err) {
      console.error(
        err,
        "There was an error Inserting the member into GuildMember! - guildMemberAdd.js line 53"
      );
    }
    return result;
  });

    // Load the current invite list
  member.guild.fetchInvites().then(guildInvites => {
    // Existing Invites
  const ei = bot.invites[member.guild.id];
    // Update Cache
  bot.invites[member.guild.id] = guildInvites;
    // Loop Invites and find the matching one
  const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    // Simplify Message
  const inviter = bot.users.cache.get(invite.inviter.id);
    // Call the embed generator
  const embedGen = new embGen();
  const newMem = embedGen.generateMemJoin(
    bot,
    MemberInfo.userName,
    MemberInfo.userImg,
    invite.code,
    inviter.tag
  );
    // Create output message
      // Output the logs in an embed
    modLogs.send(newMem).catch(console.error);
    })
};
