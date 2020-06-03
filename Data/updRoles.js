"use strict";
const GuildInfoObj = require('../Classes/guildObj.js');
module.exports = (bot, guild) => {
	/**
	 * @description Definitions for ease of use in accessing the role object and info
	 * across different sheets, and inserting into database.
	 */
  // Get the guild ID
  const GuildInfo = GuildInfoObj(bot, guild);

  // Get the guild roles
  let roles = guild.roles.cache.forEach((r) => {
    let rInfo = {
        guild_id : GuildInfo.guildID,
        role_id : r.id,
        role_name : r.name
    };
    let rSql = 'INSERT IGNORE INTO Roles Set ?';
    bot.con.query(rSql, rInfo, (err, result) => {
        if (err) {console.error('Unable to update Roles in DB: roleObj.js')}
            return result;
        })
  })
  roles;
};