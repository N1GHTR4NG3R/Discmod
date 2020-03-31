'use strict'
const Discord = require('discord.js');
const embGen = require('../Classes/embedGenerator.js');
module.exports = {
	name: 'perminvite',
	description: 'Create an invite and the bot will DM it to you.',
	guildOnly: true,
	run(bot, message, args) {
        // Get the logs Channel
        const modLogs = message.guild.channels.cache.find(ch => ch.name === 'modlogs');

        // Define User
        const user = message.author;

        //Discord URL for Invite Code
        const dUrl = "https://discord.gg/";
        
        // Define args as reasons
        const reason = args.join(' ');

        // If no reason given, Don't allow an invite!
        if (reason.length === 0){
            message.reply("Please give a reason to create a permanent invite! `/perminvite (reason)`");
        }else{
            // Create Invite
            message.channel.createInvite({
                maxAge : 0,
                maxUses : 0,
                unique: true
        }).then(
            invite => {
                // Define invite embed
                    const embedGen = new embGen();
                    const permInvite = embedGen.generatepermInviteEmb(user, message, reason, dUrl, invite);            
                // Output to modLogs
                modLogs.send(permInvite).catch(console.error)
                // Send directly to user in DM
                message.author.send(permInvite);
            }
        ).catch(console.error)
        }
	}
};