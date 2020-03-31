'use strict'
const Discord = require('discord.js');
const con = require('../Data/dbConnect.js');
const { botID } = require('../config.json');
const embGen = require('../Classes/embedGenerator.js');
const MemberInfoMethod = require('../Classes/memberObj.js');

module.exports = async (bot, member) => {
    // Get the channel to output the log too
    const modLogs = member.guild.channels.cache.find(ch => ch.name === 'modlogs');

    // Get Member Information
    const MemberInfo = MemberInfoMethod(bot, member);

    // Update Guild Information.
    const updGuildMem = [ MemberInfo.userGuildCount, MemberInfo.userGuildID ]
    let sql =  `UPDATE Guilds SET guild_member_count = ? WHERE guild_id = ?`;
    con.query(sql, updGuildMem, function (err, result){
              if (err) throw err;
              console.log(`Updated member Count for ${MemberInfo.userGuildName}`);
            })
    
    // Update Member Information
    const updMem = MemberInfo.userID
    let memSql = 'DELETE FROM Members Where member_id = ?'
    con.query(memSql, updMem, (err, result) => {
        if (err) throw err;
        console.log(`Deleted Member from ${MemberInfo.userGuildName} DB!`);
    })

    const embedGen = new embGen();
    const oldMem = embedGen.generateMemLeave(MemberInfo.userName, MemberInfo.userImg);

    // Output the log
    if (botID === MemberInfo.userID){
        console.log("Contender has left a guild!")
    }else {
    modLogs.send(oldMem).catch(console.error);
    // console.log('member Left!') <-- Commented out to clear console, Left for TS later if needed
    }
}