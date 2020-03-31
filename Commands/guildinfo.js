'use strict'
const Discord = require('discord.js');
const embGen = require('../Classes/embedGenerator.js');
module.exports = {
    name: 'guildinfo',
	description: 'Command to get guild information.',
	guildOnly: true,
	run(bot, message, args) {
        const guildID = message.guild.id;

        const user = message.author;

        // Get member Count
        const memCount = message.guild.memberCount;
        
        // Generate Embed
        const embedGen = new embGen();
        const giEmb = embedGen.generateguildInfoEmb(user, memCount, message);

        message.channel.send(giEmb);
    }
}