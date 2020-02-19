'use strict'
const Discord = require('discord.js');
const con = require('../Data/dbConnect.js');
const { color } = require('../Data/general.json');
module.exports = async (bot, member) => {
    
    // Get the channel to output the log too
    const modLogs = member.guild.channels.find(ch => ch.name === 'modlogs');

    // Get the member
    const memberJoined = member.user;

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

    // Define the member join log
    const newMemLog = new Discord.RichEmbed()
        .setColor(`${color.Pass}`)
        .setTitle('===   Member Joined   ===')
        .setDescription(memberJoined + 'has just joined the server!')
        .addField('__Time Joined:__', `${currTimeStamp}`)
        .setThumbnail(`${memberJoined.displayAvatarURL}`)
        .setFooter(`${member.guild} ` + `©️`);

    // Define a bot join warning
    const botWarn = new Discord.RichEmbed()
            .setColor(`${color.Alert}`)
            .setTitle('===   Bot Warning   ===')
            .setDescription(memberJoined + 'Is a bot')
            .addField('If you invited this bot, Please disregard this message')
            .setThumbnail(`${memberJoined.displayAvatarURL}`)
            .setFooter(`${member.guild} `+`©️`)

    // push the log
    modLogs.send(newMemLog).catch(console.error);
    console.log('member Joined!')

    // If member is a bot
    if(memberJoined.bot === true){
        modLogs.send(botWarn).catch(console.error);
        console.log('Bot Join Warning!')
    }
}