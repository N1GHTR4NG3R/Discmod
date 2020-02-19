'use strict'
const Discord = require('discord.js');
const { color } = require('../Data/general.json');
module.exports = {
	name: 'invite',
	description: 'Create an invite and the bot will DM it to you.',
	guildOnly: true,
	run(bot, message, args) {
        // Get the logs Channel
        const modLogs = message.guild.channels.find(ch => ch.name === 'modlogs');

        // Define User
        const user = message.author;

        //Discord URL for Invite Code
        const dUrl = "https://discord.gg/";
        
        // Define args as reasons
        const reason = args.join(' ');

        // If no reason given, Don't allow an invite!
        if (reason.length === 0){
            message.reply("Please give a reason to create an invite! `/invite (reason)`");
        }else{
        // Create Invite
        message.channel.createInvite({
            maxAge : 86400,
            maxUses : 10,
            unique: true
            }).then(
                invite => {// Define invite message
                const inviteMsg = new Discord.RichEmbed()
                    .setColor(color.Cool)
                    .setTitle('===  Temp invite created  ===')
                    .addField('__Created for:__', `${user}`, true)
                    .addField('__Channel:__', `${message.channel.name}`, true)
                    .addField('__Reason:__', `${reason}`)
                    .addField('__Invite Code:__', `${dUrl}${invite.code}`)
                    .addField('__Valid for__',' 24hrs ' )
                    .setThumbnail(message.author.displayAvatarURL)
                    .setTimestamp()
                    .setFooter(`${message.guild} ` + `©️`);            
                // Output to modLogs
                modLogs.send(inviteMsg).catch(console.error)
                // Send directly to user in DM
                message.author.send(inviteMsg);
            }
        ).catch(console.error)
        }
	}
};