'use strict'
const embGen = require('../Classes/embedGenerator.js');

module.exports = (bot, oldMessage, newMessage ) => {

    // Check if Bot?
    if(oldMessage.author.bot || newMessage.author.bot) return; // Probably don't need this!

    // Find logs Channel
    const modLogs = oldMessage.guild.channels.cache.find(channel => channel.name === 'modlogs');

    // Create an empty user var
    let user;

    // Define entry for later
    let entry;

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

        const embedGen = new embGen();
        const edMsg = embedGen.generateedMess(user, oldMessage, newMessage);

    // Send msg embed
    modLogs.send(edMsg).catch(console.error);
}