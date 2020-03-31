'use strict'
const Discord = require('discord.js');
module.exports = (bot, guild) => {
    /**
    * @description Definitions for ease of use in accessing the guild object and info
    * across different sheets
    */
   let GuildInfo = {
        guildCount : guild.memberCount,
        guildID : guild.id,
        guildName : guild.name,
        guildOwnerID : guild.ownerID,
        guildOwnerName : guild.owner.user.username,
   }
   return GuildInfo;
}