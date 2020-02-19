'use strict'
const Discord = require('discord.js');
const preRoles = require('../Data/general.json');
const { color } = require('../Data/general.json');
module.exports = {
	name: 'softban',
    description: 'Command to softban users from the Guild. It bans then unbans them, therefore deleting any content they have posted',
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
        const banMsg = new Discord.RichEmbed()
            .setColor(color.Alert)
            .setTitle('===  Member SoftBan  ===')
            .addField('__Author:__', `${user}`, true)
            .addField('__Channel:__', `${message.channel.name}`, true)
            .addBlankField()
            .addField('__Offender:__', `${offender} has been soft-banned!`)
            .setThumbnail(message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter(`${message.guild} ` + `©️`);

        // Define log embeds
        const deniedSoft = new Discord.RichEmbed()
            .setColor(color.Warning)
            .setTitle('===  Denied SoftBan  ===')
            .addField('__Author:__', `${user}`, true)
            .addField('__Channel:__', `${message.channel.name}`, true)
            .addBlankField()
            .addField('__Reason:__', `${user} Was unable to softban ${offender} due to permissions!`)
            .setThumbnail(message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter(`${message.guild} ` + `©️`);

        // Rolecheck to ensure those with lower roles cannot be softbanned
        if(message.member.highestRole.comparePositionTo(offender.highestRole) > 0){
            // Check if the offender has been tagged
            if(!args){
                return message.reply('You need to tag the offender!');
            } // If offender has been tagged, ask to confirm
            else if(args[0]){
                // const reason = args.slice(0).join(' ');
                const filter = m => m.content.includes('yes') && m.author.id === message.author.id;
                message.reply('Are you sure you want to softban ' + offender).then(() => {
                    message.channel.awaitMessages(filter, {max: 1, time: 5000, errors: ['time']})
                    .then(collected => {
                            // If confirmed softban
                            offender.ban();
                            modLogs.send(banMsg).catch(console.error);
                            message.guild.unban(offender.id).catch(console.error)
                    }).catch(collected => {
                        message.reply("You didn't softban " + offender)
                    });
                })
            }
        }else {
            message.reply("You are unable to softban this member")
            modLogs.send(deniedSoft).catch(console.error)
        }
	},
};