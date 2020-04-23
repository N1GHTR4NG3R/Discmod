'use strict'
const Discord = require('discord.js');
const embGen = require('../Classes/embedGenerator.js');
const getPrefix = require('../Data/guildData.js');
module.exports = async (bot, message) => {    
    // Get the logs Channel
    const modLogs = message.guild.channels.cache.find(ch => ch.name === 'modlogs');

    // Define an empty user to use later
    let user;

    // Get who deleted the message
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

    // Generate embed
    const embedGen = new embGen();
    const delMsg = embedGen.generateMsgDel(user, message);
        
    // Send the log
    getPrefix((err, result) => {
        // Loop the results
        result.forEach((item, index) => {
            if(message.guild.id === item.ID){
                if(msg.startsWith(item.Prefix) || message.author.bot){
                    return;
                } else if(msg){
                    delMsg.addField('__Content:__ ', `${msg}`);
                    modLogs.send(delMsg).catch(console.error);
                }else {
                    delMsg.addField('__Content:__ ', 'Most Likely an Embed or system message \nwas deleted somewhere!');
                    modLogs.send(delMsg).catch(console.error);
                }
            }
        })
    })
}