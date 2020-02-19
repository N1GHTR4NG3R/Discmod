'use strict'
const Discord = require('discord.js');
const con = require('../Data/dbConnect.js');
const { color } = require('../Data/general.json');
const { botID } = require('../config.json');
module.exports = async (bot, member) => {
    // Get the channel to output the log too
    const modLogs = member.guild.channels.find(ch => ch.name === 'modlogs');

    // Get the member
    const memberLeft = member.user;
    const memberID = member.id;

    // Get member Count
    const memCount = member.guild.memberCount;
    // Get Guild ID + Name
    const guildID = member.guild.id;
    const guildName = member.guild.name;

    // Update Guild specific member count.
    const updMemCount = `UPDATE Guilds 
                         SET guild_member_count = '${memCount}'
                         WHERE guild_id = '${guildID}'`;
    con.query(updMemCount, function (err, result){
              if (err) throw err;
              console.log(`Updated member Count for ${guildName}`);
            })

    // Define Timestamp
    const timeStamp = new Date();
        let y = timeStamp.getFullYear();
        let mo = (timeStamp.getMonth()+1).toString().padStart(2, 0); // +1 needed as january starts at 0 - stringify it, then pad it (add a 0 if less than two digits)
        let date = timeStamp.getDate().toString().padStart(2, 0);
        let h = timeStamp.getHours().toString().padStart(2, 0);
        let m = timeStamp.getMinutes().toString().padStart(2, 0);
        let s = timeStamp.getSeconds().toString().padStart(2, 0);

    // Collate Timestamp
    let day = date + "/" + mo + "/" + y;
    let time = h + ":" + m + ":" + s;
    let currTimeStamp = day + ' ' + time

    // Define the leaving Embed
    const oldMemLog = new Discord.RichEmbed()
        .setColor(`${color.Warning}`)
        .setTitle('===   Member Left   ===')
        .setDescription(memberLeft + 'has just left the server!')
        .addField('__Time Left:__', `${currTimeStamp}`)
        .setThumbnail(`${member.user.displayAvatarURL}`)
        .setFooter(`${member.guild} ` + `©️`);

    // Output the log
    if (botID === memberID){
        console.log("Contender has left a guild!")
    }else {
    modLogs.send(oldMemLog).catch(console.error);
    console.log('Member Left!');
    }
}