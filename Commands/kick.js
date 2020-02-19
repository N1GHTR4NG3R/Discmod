'use strict'
const Discord = require('discord.js');
const preRoles = require('../Data/general.json');
const { color } = require('../Data/general.json');
module.exports = {
	name: 'kick',
	description: 'Command to kick users from the Guild.',
	guildOnly: true,
	run(bot, message, args) {
        // Get the logs Channel
        const modLogs = message.guild.channels.find(ch => ch.name === 'modlogs');

        // Define User
        const user = message.author;

        // Define Offender
        const offender = message.mentions.members.first();
        
        // Guild roles
        const guildRoles = message.member.roles.map(r => r.name);
        
        // Check to see if user has staff role
        if(!guildRoles.some(name => preRoles.roleName.includes(name.toLowerCase()))){
            return message.channel.send('This command is only for staff!');
        }

        // Define log embeds
        const kickMsg = new Discord.RichEmbed()
            .setColor(color.Alert)
            .setTitle('===  Member Kicked  ===')
            .addField('__Author:__', `${user}`, true)
            .addField('__Channel:__', `${message.channel.name}`, true)
            .addBlankField()
            .addField('__Offender:__', `${offender} has been kicked!`)
            .setThumbnail(message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter(`${message.guild} ` + `©️`);

        // Define log embeds
        const deniedKick = new Discord.RichEmbed()
            .setColor(color.Warning)
            .setTitle('===  Denied Kicked  ===')
            .addField('__Author:__', `${user}`, true)
            .addField('__Channel:__', `${message.channel.name}`, true)
            .addBlankField()
            .addField('__Reason:__', `${user} Was unable to kick ${offender} due to permissions!`)
            .setThumbnail(message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter(`${message.guild} ` + `©️`);

        // Rolecheck to ensure those with lower roles cannot be kicked
        if(message.member.highestRole.comparePositionTo(offender.highestRole) > 0){
            // Check if the offender has been tagged
            if(!args){
                return message.reply('You need to tag the offender!');
            } // If offender has been tagged, ask to confirm
            else if(args[0]){
                // const reason = args.slice(0).join(' ');
                const filter = m => m.content.includes('yes') && m.author.id === message.author.id;
                message.reply('Are you sure you want to kick ' + offender).then(() => {
                    message.channel.awaitMessages(filter, {max: 1, time: 5000, errors: ['time']})
                    .then(collected => {
                            // If confirmed Kick
                            offender.kick();
                            modLogs.send(kickMsg).catch(console.error);
                    }).catch(collected => {
                        message.reply("You didn't kick " + offender)
                    });
                })
            }
        }else {
            message.reply("You are unable to kick this member")
            modLogs.send(deniedKick).catch(console.error)
        }
	},
};