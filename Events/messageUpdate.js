'use strict'
const Discord = require('discord.js');
const { color } = require('../Data/general.json');
module.exports = (bot, oldMessage, newMessage ) => {

    // Check if Bot?
    if(oldMessage.author.bot || newMessage.author.bot) return; // Probably don't need this!

    // Find logs Channel
    const modLogs = oldMessage.guild.channels.find(channel => channel.name === 'modlogs');

    // Create an empty user var
    let user = '';

    // Message Variable
    if(oldMessage.content === newMessage.content) return;

    // Message Editor
    const userEdit = newMessage.guild.fetchAuditLogs({ type: 'MESSAGE_UPDATE' }).then(audit => audit.entries.first());
    
    // Get Channel ID and if Original author edited it
    if (userEdit.channel === oldMessage.channel.id && (userEdit.target.id === oldMessage.author.id)
        // Check time and the count
        && (entry.createdTimestamp > (Date.now() - 5000 )) && (entry.extra.count >= 1)) {
            user = entry.executor.username;
        }else {
            // If fails, the editor is the author
            user = oldMessage.author.username;
        }

    // Create message embed
    const edEmbed = new Discord.RichEmbed()
        .setColor(`${color.Warning}`)
        .setTitle('=== EDITED MESSAGE ===')
        .addField('__Author:__', `${user}`, true)
        .addField('__Channel:__', `${oldMessage.channel.name}`, true)
        .addBlankField()
        .addField('__Old Message:__', `${oldMessage.content}`, true)
        .addField('__New Message:__', `${newMessage.content}`, true)
        .setThumbnail(newMessage.author.displayAvatarURL)
        .setTimestamp()
        .setFooter(`${oldMessage.guild} ` + `©️`);

    // Send msg embed
    modLogs.send(edEmbed).catch(console.error);
}