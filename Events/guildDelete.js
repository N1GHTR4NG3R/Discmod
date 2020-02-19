'use strict'
const Discord = require('discord.js');
const con = require('../Data/dbConnect.js');
module.exports = async (bot, guild) => {
    // Data needed to send to DB
    const guildID = guild.id;
    const guildName = guild.name;

    // Update Guild Info.
    const remGuild = `DELETE FROM Guilds 
                        WHERE guild_id = '${guildID}'`;
    con.query(remGuild, function (err, result){
              if (err) throw err;
              console.log(`Removed ${guildName} from DB!`);
            })
    
    let guildData = console.table(bot.guilds.map((g) => ({ ID: g.id, Name: g.name})));
    guildData;
}