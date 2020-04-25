'use strict'
module.exports = (bot, member) => {
    /**
    * @description Definitions for ease of use in accessing the member object and info
    * across different sheets
    */
   let MemberInfo = {
        userGuildCount : member.guild.memberCount,
        userGuildID : member.guild.id,
        userGuildName : member.guild.name,
        userName : member.user.username,
        userImg : member.user.displayAvatarURL(),
        userID : member.id,
        userDisc : member.user.discriminator
   }
   return MemberInfo;
}