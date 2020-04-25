/* eslint-disable require-atomic-updates */
/* eslint-disable no-async-promise-executor */
'use strict'
// Essentials
const Discord = require('discord.js');
const fs = require('fs');
const db = require('./Data/dbConnection.js');
const { token } = require('./config.json');

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

// Create Bot Database Connection
const botConnect = () => new Promise(async(resolve) => {
    bot.con = await db.Connect();
    bot.con.on("error", async(e) => {
        await db.reConnect(bot.con, e);
        botConnect();
    })
    return resolve();
})

// activation to get the bot to work
bot.on('ready', async() => {
    // Update GuildDB on Start up
    await botConnect();
    async function guildInfo() {
        try {
        let guildDB = bot.guilds.cache.forEach((g) => {
            let gInfo = {
                guild_id: g.id,
                guild_name: g.name,
                guild_owner: g.owner.user.username,
                guild_owner_id: g.ownerID,
                guild_member_count: g.memberCount,
                guild_prefix: g.prefix
            }
        let gSql = 'INSERT IGNORE INTO Guilds Set ?';
        bot.con.query(gSql, gInfo, (err, result) => {
            if (err) {console.error('Unable to update Guild data Table: Index.js - Line 40')}
                return result;
            })  
        });
        guildDB;
        // Get Guild Info and output as table
            bot.con.query("SELECT G.guild_id, G.guild_name, G.guild_owner, G.guild_owner_id, G.guild_member_count, G.guild_prefix FROM Guilds G", (err, result) => {
                if (err) {console.error('Unable to get Guild data Table: Index.js - Line 56')}
                console.table(result);
                bot.prefixes = {};
                result.forEach(r => {
                    bot.prefixes[r.guild_id] = r.guild_prefix
                });
                console.log('Contender is connected!');
            });
        }catch(e){
          console.error(e, "Unable to Connect!")
        }
      }
    guildInfo();
    // Set Bot's activity
    bot.user.setActivity('https://discord.gg/Tz3mRyJ');
})

// log-in
bot.login(token);