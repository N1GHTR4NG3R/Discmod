'use strict'
const Discord = require('discord.js');
let con = require('../Data/dbConnect.js');
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
              console.log(`Removed a member from ${MemberInfo.userGuildName}`);
            })

    // Update Member Information
    const updMemID = MemberInfo.userID;
    const remguiMemID = MemberInfo.userGuildID;
    let memSql = 'DELETE FROM Guildmembers Where guild_id = ? And member_id = ?'
    con.query(memSql, [remguiMemID, updMemID], (err, result) => {
        if (err) {throw err;}
        console.log(`Deleted Member from ${MemberInfo.userGuildName} Guildmembers!`);
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