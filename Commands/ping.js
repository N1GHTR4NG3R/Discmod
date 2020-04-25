'use strict'
const embGen = require('../Classes/embedGenerator.js');
module.exports = {
    name: 'ping',
	// Timer to avoid Spam, Useful with API's
	cooldown : 5,
	description : "Outputs the bot's ping data and uptime",
	usage: '/ping',
	access: 'Members',
	run(bot, message) {
		message.channel.send('Pinging...').then(msg => {
			
			// Get ping by checking created message time vs edited message time
			let ping = msg.createdTimestamp - message.createdTimestamp;
			
			// Define time periods
			let ms = (bot.uptime / 1000);
				const mo = Math.floor((ms / 2620800) % 60).toString();
				const w = Math.floor((ms / 604800) % 60).toString();
				const d = Math.floor((ms / 86400) % 60).toString();
				const h = Math.floor((ms / 3600) % 60).toString();
				const m = Math.floor((ms / 60) % 60).toString();
				const s = Math.floor(ms % 60).toString();

			// Generate embed
			const embedGen = new embGen();
			const botDet = embedGen.generatepingEmb(ping, bot, mo, w, d, h, m, s, message);

			// Selete original msg and send embed
			msg.delete();
			msg.channel.send(botDet);
		});
	},
}