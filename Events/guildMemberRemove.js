'use strict'
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
    bot.con.query(sql, updGuildMem, function (err, result){
        if (err) {console.error(err, "There was an error Updating the guild in the DB!")}
              console.log(`Removed a member from ${MemberInfo.userGuildName}`);
              return result;
            })

    // Update Member Information
    const updMem = [MemberInfo.userGuildID, MemberInfo.userID]
    let memSql = 'DELETE FROM Guildmembers Where guild_id = ? And member_id = ?'
    bot.con.query(memSql, updMem, (err, result) => {
        if (err) {console.error(err, "There was an error Updating the member in Members!")}
        console.log(`Deleted Member from ${MemberInfo.userGuildName} Guildmembers!`);
        return result;
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