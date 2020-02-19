'use strict'
const Discord = require('discord.js');
const { color } = require('../Data/general.json');
module.exports = async (bot, oldMember, newMember) => {
    // Shorten newMember
    const nUser = newMember.user.username;

    // Grab logs channel
    const modLogs = oldMember.guild.channels.find(ch => ch.name === 'modlogs');

    // Define Embed
    const vEmbed = new Discord.RichEmbed()
        .setColor(color.Cool)
        .setTitle('===  Voip Log  ===')
        .setThumbnail(oldMember.user.displayAvatarURL)
        .setFooter(`${newMember.guild} ` + `©️`)
    
    if(newMember.voiceChannel == null){
        vEmbed.addField('__Disconnected:__', `${nUser}` + ' left ' + `${oldMember.voiceChannel.name}`);
        modLogs.send(vEmbed).catch(console.error);
    }
    if(oldMember.voiceChannel == null){
        vEmbed.addField('__Connected:__', `${nUser}` + ' joined ' + `${newMember.voiceChannel.name}`);
        modLogs.send(vEmbed).catch(console.error);
    }
}