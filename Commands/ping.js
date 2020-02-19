'use strict'
const Discord = require('discord.js');
const { color } = require('../Data/general.json');
module.exports = {
    name: 'ping',
	// Timer to avoid Spam, Useful with API's
	cooldown : 5,
	description : "Outputs the bot's ping data and uptime",
	run(bot, message) {
		message.channel.send('Pinging...').then(msg => {
			
			// Get ping by checking created message time vs edited message time
			let ping = msg.createdTimestamp - message.createdTimestamp;
			
			// Define time periods
			let ms = (bot.uptime / 1000);
				const y = Math.floor(ms / 31449600).toString();
				const mo = Math.floor(ms / 2620800).toString();
				const w = Math.floor(ms / 604800).toString();
				const d = Math.floor(ms / 86400).toString();
				const h = Math.floor(ms / 3600).toString();
				const m = Math.floor(ms / 60).toString();
				const s = Math.floor(ms % 60).toString();
				


			// Define Message Embed 
			const botDet = new Discord.RichEmbed()
				.setColor(color.Pass)
				.setTitle('===  Ping + Latency Details  ===')
				.addField('__Ping:__', `${ping}ms`, true)
				.addField('__API Ping:__', `${Math.round(bot.ping)}ms`, true)
				.addField('\u200B', '__Details for the uptime of the bot:__')
				.addField('__Years__', `${y.padStart(2, "0")}`, true)
				.addField('__Months:__', `${mo.padStart(2, "0")}`, true)
				.addField('__Weeks:__', `${w.padStart(2, "0")}`, true)
				.addField('__Days:__', `${d.padStart(1, "0")}`, true)
				.addField('__Hours:__', `${h.padStart(2, "0")}`, true)
				.addField('__Minutes:__', `${m.padStart(2, "0")}`, true)
				.addField('__Seconds:__', `${s.padStart(2, "0")}`, true)
				.setThumbnail(message.author.displayAvatarURL)
				.setTimestamp()
				.setFooter(`${message.guild} ` + `©️`);

			msg.edit(botDet);
		});
	},
}