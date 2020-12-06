"use strict";
const GuildInfoObj = require("../Classes/guildObj.js");
module.exports = (bot, guild) => {
  /**
   * @description Definitions for ease of use in accessing the channels and info
   * across different sheets, and inserting into database.
   */
  // Get the guild ID
  const GuildInfo = GuildInfoObj(bot, guild);

  // Get the channels
  const validChannels = guild.channels.cache.filter((ch) => ch.type === "text");
  let chans = validChannels.forEach((c) => {
    let cInfo = {
      guild_id: GuildInfo.guildID,
      channel_id: c.id,
      channel_name: c.name,
    };
    let cSql = "INSERT IGNORE INTO Channels Set ?";
    bot.con.query(cSql, cInfo, (err, result) => {
      if (err) {
        console.error("Unable to update Channels in DB: updChannels.js");
      }
      return result;
    });
  });
  chans;
};
