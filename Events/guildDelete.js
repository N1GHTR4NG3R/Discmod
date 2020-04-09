'use strict'
const Discord = require('discord.js');
let con = require('../Data/dbConnect.js');
const GuildInfoObj = require('../Classes/guildObj.js');
module.exports = async (bot, guild) => {
    // Get Guild Information
    const GuildInfo = GuildInfoObj(bot, guild);

    // Update Guild Info.
    const remGuild = GuildInfo.guildID;
    const gidNum = BigInt(remGuild); // Convert ID from String to Number!.
    const sql = 'DELETE FROM Guilds Where guild_id = ?';
    con.query(sql, gidNum, function (err, result){
              if (err) throw err;
              console.log(`Removed ${GuildInfo.guildName} from DB!`);
            })
    // Will need to add a function to check for members in said guild once the bot leaves a guild to remove entries.
    
    let guildData = console.table(bot.guilds.cache.map((g) => ({ ID: g.id, Name: g.name, Members: g.memberCount})));
    guildData;
}