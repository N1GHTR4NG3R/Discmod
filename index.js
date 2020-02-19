'use strict'
// Essentials
const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./config.json');
const db = require('./Data/dbConnect.js');

// Define the bot
const bot = new Discord.Client();

// Create Bot commands as collection
bot.commands = new Discord.Collection();

//Create file handlers
fs.readdir('./Commands', (err, files) => {
    if(err) console.error(err);
    const commFiles = files.filter( f => f.split('.').pop() === 'js');
    if (commFiles.length <= 0) {return console.log('No commands Found!');}
    else {console.log(commFiles.length + ' commands found!');}
        commFiles.forEach((f) => {
            const command = require(`./Commands/${f}`);
            console.log(`Command ${f} loaded!`);
            bot.commands.set(command.name, command);
        });
});

fs.readdir('./Events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./Events/${file}`);
        const eventName = file.split('.')[0];
        bot.on(eventName, event.bind(null, bot));
    });
});

// activation to get the bot to work
bot.on('ready', async () => {
    console.log('Contender is connected too:');
    let guildData = console.table(bot.guilds.map((g) => ({ ID: g.id, Name: g.name})));
    guildData;
    bot.user.setActivity('In development mode!');
    db;
})

// log-in
bot.login(token);