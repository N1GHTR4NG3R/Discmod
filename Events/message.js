'use strict'
const Discord = require('discord.js');
const { prefix, modChannels } = require('../config.json');
module.exports = (bot, message, guild) => {
    // Create a cooldown collection
    const coolDown = new Discord.Collection();

    // Check the Prefix, Ignore if User is a bot!
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    // Remove prefix and put commands into lowercase for ease
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Check to see if there is a command and if the prefix is used!
    const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if(!command) return;
    if(command.args && !args.length){
        return message.channel.send(`${message.author} sorry, that is not a valid command!`);
    }
    
    // Is command limited to a certain Guild
    if (command.guildOnly && message.channel.type !== 'text') {
        // Not implemented yet, Can be used to lock commands for donations - Consider an embed for info instead?
        return message.reply(`This command is not available here, Contact the bot Admin at ${email}`);
    }

    // Create the cooldown and set the period
    if(!coolDown.has(command.name)){
        coolDown.set(command.name, new Discord.Collection());
    }
    const current = Date.now();
    const timeStamp = coolDown.get(command.name);
    const timer = (command.coolDown || 5)* 1000;

    // Check authors msg time, and compare with timer!
    if (timeStamp.has(message.author.id)){
        const expTime = timeStamp.get(message.author.id) + timer;
        // If active, Inform Author
        if(current < expTime) {
            const timeLeft = (expTime - current) / 1000;
            return message.reply(`Please wait another ${timeLeft.toFixed(1)} second(s), before trying again!.`);
        }
    }
    // Set author msg time with the timestamp
    timeStamp.set(message.author.id, current);

    // Create Timeout callback if above statement does not remove authors timeStamp.
    setTimeout(() => timeStamp.delete(message.author.id), timer);
    // If Command, Execute it!
    try {
        command.run(bot, message, args); // Arguments to export for commands!
    }catch (error){
        console.error(error);
    }
}