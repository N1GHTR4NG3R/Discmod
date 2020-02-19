'use strict'
const Discord = require('discord.js');
const { color } = require('../Data/general.json');
module.exports = async (bot, message) => {
    // Get the logs Channel
    const modLogs = message.guild.channels.find(ch => ch.name === 'modlogs');

    // Define an empty user to use later
    let user;

    // Get who deleted a message
    const deletor = message.guild.fetchAuditLogs({ type: 'MESSAGE_DELETE' }).then(audit => audit.entries.first());

    // Define the message
    let msg = message.content;

    //Attachment Array - Used for pictures etc...
    const attach = message.attachments.array();
        for (let i = 0; i < attach.length; i++){
            const attachment = attach[i];
            const url = attachment.url;
            // Assign Attachments to messages
            msg += url + '\n\n';
        }
    
    // Check channel and if message author deleted it
    if (deletor.channel === message.channel.id && (deletor.target.id === message.author.id)
        // Check time and count
        && (deletor.createdTimestamp > (Date.now()-5000)) && (deletor.extra.count >= 1)) {
            user = deletor.executor.username;
        } else { // If checks above fail the deletor is the author
            user = message.author.username;
        }

    // Define the embed log
    const delMsgLog = new Discord.RichEmbed()
		.setColor(color.Alert)
		.setTitle('===  DELETED MESSAGE  ===')
		.addField('__Author:__', `${user}`, true)
        .addField('__Channel:__', `${message.channel.name}`, true)
        .addBlankField()
		.setThumbnail(message.author.displayAvatarURL)
		.setTimestamp()
        .setFooter(`${message.guild} ` + `©️`);
        
    // Send the log
    if(msg){
        delMsgLog.addField('__Content:__ ', `${msg}`, true);
        modLogs.send(delMsgLog).catch(console.error);
    } else{
        delMsgLog.addField('__Content:__ ', 'Most Likely an Embed or system message \nwas deleted somewhere!', true);
        modLogs.send(delMsgLog).catch(console.error);
    }
}