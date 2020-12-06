"use strict";
const GuildInfoObj = require("../Classes/guildObj.js");
module.exports = async (bot, guild) => {
  // Get Guild Information
  const GuildInfo = GuildInfoObj(bot, guild);

  // Update Guild Info.
  const gSql = "DELETE FROM GuildMember Where guild_id = ?";
  bot.con.query(gSql, GuildInfo.guildID, function (err, result) {
    if (err) throw err;
    return result;
  });

  const sql = "DELETE FROM Guilds Where guild_id = ?";
  bot.con.query(sql, GuildInfo.guildID, function (err, result) {
    if (err) throw err;
    console.log(`Removed ${GuildInfo.guildName} from DB!`);
    return result;
  });
  // Will need to add a function to check for members in said guild once the bot leaves a guild to remove entries.

  let guildData = console.table(
    bot.guilds.cache.map((g) => {
      return { ID: g.id, Name: g.name, Members: g.memberCount };
    })
  );
  guildData;
};
