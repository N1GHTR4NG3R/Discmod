'use strict'
const fs = require('fs');
module.exports = {
    name: 'reload',
	cooldown : 5,
	description : "Reloads a command file to avoid taking the bot down",
	run(bot, message, args) {
        // Restrict to dev only!
        if(message.author.id != "267472049511858177"){
            message.reply(`:warning:  **You are not able to use this command**  :warning:`)
        }
        // Command check
        if(!args[0]) return message.channel.send("Please specify the command!");
        // Get the command
        let command = args[0].toLowerCase();

        try{
            delete require.cache[require.resolve(`./${command}.js`)] // used to reload the file
            bot.commands.delete(command)
            const pull = require(`./${command}.js`)
            bot.commands.set(command, pull)
        } catch(e) {
            return message.reply(`Was not able to reload: \`${args[0].toUpperCase()}\``)
        }
        message.reply(` :desktop:  **${args[0].toUpperCase()} Script Reloaded**  :desktop:`);
    }
}