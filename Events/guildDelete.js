'use strict'
const Discord = require('discord.js');
const con = require('../Data/dbConnect.js');
const GuildInfoObj = require('../Classes/guildObj.js');
module.exports = async (bot, guild) => {
    // Get Guild Information
    const GuildInfo = GuildInfoObj(bot, guild);

    // Update Guild Info.
    const remGuild = GuildInfo.guildID;
    const sql = 'DELETE FROM Guilds Where guild_id = ?';
    con.query(sql, remGuild, function (err, result){
              if (err) throw err;
              console.log(`Removed ${GuildInfo.guildName} from DB!`);
            })
    
    let guildData = console.table(bot.guilds.cache.map((g) => ({ ID: g.id, Name: g.name, Members: g.memberCount})));
    guildData;
}