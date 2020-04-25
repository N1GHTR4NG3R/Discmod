const Discord = require('discord.js');
const { color } = require('../Data/general.json');
/*
    // First create a timestamp for logs
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

    Edited out for the time being...
*/
/**
 * @description Embed generator file to hold all embeds, to reduce clutter elsewhere keeping cleaner code.
 */

class embGen {
    /**
     * @description Generates the embed objects for Moderation
     * @param {string} userName Name of the user.
     * @param {string} userImg User Avatar.
     * @param {string} user Empty User.
     * @param {string} message Message event in Discord.js.
     * @param {string} oldMessage old message in Discord.js when message is edited.
     * @param {string} newMessage new message event in Discord.js when message is edited.
     * @param {string} oldState old member voice state event - Not currently used here yet.
     * @param {string} newState new member voice state event.
     * @param {string} reason User Input for giving reasons for Invites and kicks/bans.
     * @param {string} dUrl url link to compliment the invite code given, to make it clickable.
     * @param {string} invite invite code for discord that is produced.
     * @param {string} ping checks the users ping to the bot. 
     * @param {string} bot defines contender bot.
     * @param {string} offender defines the member who is being kicked.
     * @param {string} memCount grabs the current guilds member count.
     */

        // Member Joins
        generateMemJoin(userName, userImg) {
        const newMemLog = new Discord.MessageEmbed()
            .setColor(`${color.Pass}`)
            .setTitle('===   Member Joined   ===')
            .setDescription(userName + ' has just joined the server!')
            .setThumbnail(`${userImg}`)
            .setTimestamp()
            .setFooter(`©️ ` + `Contender Bot 2020`);
            return newMemLog;
        }

        // If member is a bot
        generateBotWarn(userName, userImg){
        const botWarn = new Discord.MessageEmbed()
            .setColor(`${color.Alert}`)
            .setTitle('===   Bot Warning   ===')
            .setDescription(userName + 'Is a bot')
            .addField('If you invited this bot, Please disregard this message')
            .setThumbnail(`${userImg}`)
            .setTimestamp()
            .setFooter(`©️ ` + `Contender Bot 2020`);
            return botWarn;
        }

        // Member Leaves
        generateMemLeave(userName, userImg){
        const oldMemLog = new Discord.MessageEmbed()
            .setColor(`${color.Warning}`)
            .setTitle('===   Member Left   ===')
            .setDescription(userName + ' has just left the server!')
            .setThumbnail(`${userImg}`)
            .setTimestamp()
            .setFooter(`©️ ` + `Contender Bot 2020`);
            return oldMemLog;
        }

        // Create message embed
        generateedMess(user, oldMessage, newMessage){
        const edEmbed = new Discord.MessageEmbed()
            .setColor(`${color.Warning}`)
            .setTitle('=== EDITED MESSAGE ===')
            .addField('__Author:__', `${user}`, true)
            .addField('__Channel:__', `${oldMessage.channel.name}`, true)
            .addField('__Old Message:__', `${oldMessage.content}`)
            .addField('__New Message:__', `${newMessage.content}`)
            .setThumbnail(newMessage.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(`©️ ` + `Contender Bot 2020`);
            return edEmbed
        }

        // Message Delete
        generateMsgDel(user, message){
        const delMsgLog = new Discord.MessageEmbed()
            .setColor(color.Alert)
            .setTitle('===  DELETED MESSAGE  ===')
            .addField('__Author:__', `${user}`, true)
            .addField('__Channel:__', `${message.channel.name}`, true)
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(`©️ ` + `Contender Bot 2020`);
            return delMsgLog;
        }

        // Define Voice State embed
        generatevoiceEmb(newState){
        const vEmbed = new Discord.MessageEmbed()
            .setColor(color.Cool)
            .setTitle('===  Voip Log  ===')
            .setThumbnail(newState.member.user.displayAvatarURL())
            .setTimestamp()
            .setFooter(`©️ ` + `Contender Bot 2020`);
            return vEmbed
        }

        // Define temp invite embed
        generatetempInvEmb(user, message, reason, dUrl, invite){
        const inviteMsg = new Discord.MessageEmbed()
            .setColor(color.Cool)
            .setTitle('===  Temp invite created  ===')
            .addField('__Created for:__', `${user}`, true)
            .addField('__Channel:__', `${message.channel.name}`, true)
            .addField('__Invite Code:__', `${dUrl}${invite.code}`)
            .addField('__Valid for__',' 24hrs ', true)
            .addField('__Max Uses__',' 10 ', true)
            .addField('__Reason:__', `${reason}`)
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(`©️ ` + `Contender Bot 2020`);
            return inviteMsg
        }

        // Define Perm Invite embed
        generatepermInviteEmb(user, message, reason, dUrl, invite){
        const permInv = new Discord.MessageEmbed()
            .setColor(color.Cool)
            .setTitle('===  Perm invite created  ===')
            .addField('__Created for:__', `${user}`, true)
            .addField('__Channel:__', `${message.channel.name}`, true)
            .addField('__Invite Code:__', `${dUrl}${invite.code}`)
            .addField('__Valid for__',' Permanent ' )
            .addField('__Reason:__', `${reason}`)
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(`©️ ` + `Contender Bot 2020`);
            return permInv
        }

        // Define Ping Embed
        generatepingEmb(ping, bot, mo, w, d, h, m, s, message){
		const botDet = new Discord.MessageEmbed()
            .setColor(color.Pass)
            .setTitle('===  Ping + Latency Details  ===')
            .addField('__Ping:__', `${ping}ms`, true)
            .addField('__API Ping:__', `${Math.round(bot.ws.ping)}ms`, true)
            .addField('\u200B', '__Details for the uptime of the bot:__')
            .addField('__Months__', `${mo.padStart(2, "0")}`, true)
            .addField('__Weeks:__', `${w.padStart(1, "0")}`, true)
            .addField('__Days:__', `${d.padStart(1, "0")}`, true)
            .addField('__Hours:__', `${h.padStart(2, "0")}`, true)
            .addField('__Minute:__', `${m.padStart(2, "0")}`, true)
            .addField('__Seconds:__', `${s.padStart(2, "0")}`, true)
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(`©️ ` + `Contender Bot 2020`);
            return botDet
        }

        // Define kick embed
        generatekickEmb(user, message, offender, reason){
        const kickMsg = new Discord.MessageEmbed()
            .setColor(color.Alert)
            .setTitle('===  Member Kicked  ===')
            .addField('__Author:__', `${user}`, true)
            .addField('__Channel:__', `${message.channel.name}`, true)
            .addField('__Reason__', ` \u200b${reason}`) // Uni-code placeholder put in to avoid killing bot before being called
            .addField('__Offender:__', `${offender} has been kicked!`)
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(`©️ ` + `Contender Bot 2020`);
            return kickMsg
        }

        // Define deny kick embed
        generatedenyEmb(user, message, offender){
        const deniedKick = new Discord.MessageEmbed()
            .setColor(color.Warning)
            .setTitle('===  Denied Kicked  ===')
            .addField('__Author:__', `${user}`, true)
            .addField('__Channel:__', `${message.channel.name}`, true)
            .addField('__Reason:__', `${user} Was unable to kick ${offender} due to permissions!`)
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(`©️ ` + `Contender Bot 2020`);
            return deniedKick
        }

        // Define softban embed
        generatesoftBanEmb(user, message, offender, reason){
        const softMsg = new Discord.MessageEmbed()
            .setColor(color.Alert)
            .setTitle('===  Member SoftBan  ===')
            .addField('__Author:__', `${user}`, true)
            .addField('__Channel:__', `${message.channel.name}`, true)
            .addField('__Offender:__', `${offender} has been soft-banned!`)
            .addField('__Reason:__', ` \u200b${reason}`) // Uni-code placeholder put in to avoid killing bot before being called
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(`©️ ` + `Contender Bot 2020`);
            return softMsg
        }

        // Define softban deny embed
        generatesoftDenyEmb(user, message, offender){
        const deniedSoft = new Discord.MessageEmbed()
            .setColor(color.Warning)
            .setTitle('===  Denied SoftBan  ===')
            .addField('__Author:__', `${user}`, true)
            .addField('__Channel:__', `${message.channel.name}`, true)
            .addField('__Reason:__', `${user} Was unable to softban ${offender} due to permissions!`)
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(`©️ ` + `Contender Bot 2020`);
            return deniedSoft
        }

        // Define ban embed
        generatebanEmb(user, message, offender, reason){
        const banMsg = new Discord.MessageEmbed()
            .setColor(color.Alert)
            .setTitle('===  Member Ban  ===')
            .addField('__Author:__', `${user}`, true)
            .addField('__Channel:__', `${message.channel.name}`, true)
            .addField('__Offender:__', `${offender} has been banned!`)
            .addField('__Reason:__', ` \u200b${reason}`) // Uni-code placeholder put in to avoid killing bot before being called
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(`©️ ` + `Contender Bot 2020`);
            return banMsg
        }

        // Define deny ban embed
        generatebanDenyEmb(user, message, offender){
        const deniedBan = new Discord.MessageEmbed()
            .setColor(color.Warning)
            .setTitle('===  Denied Ban  ===')
            .addField('__Author:__', `${user}`, true)
            .addField('__Channel:__', `${message.channel.name}`, true)
            .addField('__Reason:__', `${user} Was unable to ban ${offender} due to permissions!`)
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(`©️ ` + `Contender Bot 2020`);
            return deniedBan
        }

        // Define guild info embed
        generateguildInfoEmb(user, memCount, guiName, guiID, guiOwner, guiCreate, guiChan, message){
        const giEmbed = new Discord.MessageEmbed()
            .setColor(color.Cool)
            .setTitle(`===  ${guiName}'s Info  ===`)
            .addField('__Guild ID:__', `${guiID}`, true)
            .addField('\u200b', ` \u200b`, true) // Uni-code placeholder put in to avoid killing bot before being called
            .addField('__Guild Owner:__', `${guiOwner}`,true)
            .addField('__Member Count:__', `${memCount}`, true)
            .addField('\u200b', ` \u200b`, true)
            .addField('__Channel Count:__', `${guiChan}`, true)
            .addField('__Created on:__', `${guiCreate}`)
            .addField('__Requested by:__', `${user}`)
            .setThumbnail(message.guild.iconURL())
            .setTimestamp()
            .setFooter(`©️ ` + `Contender Bot 2020`);
            return giEmbed
        }

        // Help embed
        generatehelpEmb(message) {       
            // Create Embed
            const helpMsg = new Discord.MessageEmbed()
                .setColor(`${color.Cool}`)
                .setTitle('===   Help   ===')
                .setDescription('Thanks for using Contender Bot!')
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp()
                .setFooter(`©️ ` + `Contender Bot 2020`);
            return helpMsg
        }

        // Help cmd embed
        generatecmdEmb(message) {       
            // Create Embed
            const cmdMsg = new Discord.MessageEmbed()
                .setColor(`${color.Cool}`)
                .setTitle('===   Commands   ===')
                .setDescription('Message embed to outline commands and usages')
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp()
                .setFooter(`©️ ` + `Contender Bot 2020`);
            return cmdMsg
        }
}
module.exports = embGen;