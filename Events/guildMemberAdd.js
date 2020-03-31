'use strict'
const Discord = require('discord.js');
const con = require('../Data/dbConnect.js');
const embGen = require('../Classes/embedGenerator.js');
const MemberInfoObj = require('../Classes/memberObj.js');
module.exports = async (bot, member) => {

    // Get the channel to output the log too
    const modLogs = member.guild.channels.cache.find(ch => ch.name === 'modlogs');
    
    // Get Member Information
    const MemberInfo = MemberInfoObj(bot, member);

    // Update Guild Information
    const updGuildMem = [ MemberInfo.userGuildCount, MemberInfo.userGuildID ]
    let sql = 'UPDATE Guilds SET guild_member_count = ? WHERE guild_id = ?'
    con.query(sql, updGuildMem, function (err, result){
              if (err) throw err;
              console.log(`Updated member Count for ${MemberInfo.userGuildName}`);
            })
    
    // Update Member Information
    const updMem = { member_id : MemberInfo.userID, member_name : MemberInfo.userName, member_discrim : MemberInfo.userDisc, guild_id : MemberInfo.userGuildID }
    let memSql = 'INSERT INTO Members Set ?'
    con.query(memSql, updMem, (err, result) => {
        if (err) throw err;
        console.log(`Updated Member Table for ${MemberInfo.userName}`);
    })

    // Call the embed generator
    const embedGen = new embGen();
    const newMem = embedGen.generateMemJoin(MemberInfo.userName, MemberInfo.userImg);
    const botWarning = embedGen.generateBotWarn(MemberInfo.userName, MemberInfo.userImg);

    // Output the logs in an embed
    modLogs.send(newMem).catch(console.error);
    // console.log('member Joined!') <-- Commented out to clear console, Left for TS later if needed

    // And if the member is a bot
    if(MemberInfo.userName.bot === true){
        modLogs.send(botWarning).catch(console.error);
        console.log('Bot Join Warning!')
    }
}