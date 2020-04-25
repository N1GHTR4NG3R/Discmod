'use strict'
const preRoles = require('../Data/general.json');
const GuildInfoObj = require('../Classes/guildObj.js');
module.exports = async (bot, guild) => {
    // Check Permissions
    if(guild.me.hasPermission(['MANAGE_CHANNELS', 'MANAGE_ROLES'])){
        console.log('Has Permissions!');
     }

    // Guild roles
    const guildRoles = guild.roles.cache.map(r => r.name);
    // check roles
      if(guildRoles.some(name => preRoles.roleName.includes(name.toLowerCase()))){
        console.log('Match found!');
      }else{
        const mod = await guild.roles.create({
            data: {
                name : 'Moderator',
                color: 'BLUE',
                permissions: ['MANAGE_CHANNELS','EMBED_LINKS','ATTACH_FILES','VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES',
                                 'MANAGE_ROLES', 'KICK_MEMBERS','BAN_MEMBERS', 'CREATE_INSTANT_INVITE', 'CHANGE_NICKNAME', 
                                 'MANAGE_NICKNAMES','MANAGE_MESSAGES', 'MENTION_EVERYONE', 'ADD_REACTIONS', 'CONNECT', 'SPEAK',
                                 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD']
               }
            })
            mod;
            console.log('Moderator role created');
        }

    // Find the Mod role:
    let modRole = await guild.roles.cache.find(r => r.name === 'Moderator');    
    // Check for logs channel - If not found, create it!
    const staffArea = guild.channels.cache.find(channel => channel.name === 'Staff Area');
    if(!staffArea){
       try {
           guild.channels.create('Staff Area', {
               type : 'category',
               topic : 'Staff Area',
               permissionOverwrites : [{
                id : modRole.id,
                allow : ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES', 'MANAGE_MESSAGES','EMBED_LINKS', 'ATTACH_FILES']
               },
               {
                id : guild.id,
                deny : ['VIEW_CHANNEL']
                }],
           })
           console.log('Staff Area created!');
       } catch (error){
        console.log(error)
       }
    }
    const modLogs = await guild.channels.cache.find(channel => channel.name === 'modlogs');
    if(!modLogs){
        try{
            guild.channels.create('modlogs', {
                type: 'text',
                topic: 'Logs Channel'
            }).then(async channel => {
             let staff = guild.channels.cache.find(c => c.name == "Staff Area" && c.type == "category");
             if (!staff){
                 console.log("Staff Area not found!");
             }
             await channel.setParent(staff.id).then(x => {console.log("Parent Set!")
             x.lockPermissions() }).catch(err => {console.error("An error Occurred.", err)})
             console.log("Staff area built and roles assigned");
             })
         }
        catch (error){
            console.log(error)
        }
    }

    // Get Guild Information
    const GuildInfo = GuildInfoObj(bot, guild);

    // Check guildInfo isn't duplicated
    let checkID = GuildInfo.guildID;
    let search = 'SELECT guild_id FROM Guilds WHERE guild_id = ?';
    bot.con.query(search, checkID, (err, res) => {
        if (err) {console.error(err, "There was an error Insering into the guild to the DB!")}
        if (res.length === 0){
            // Insert Info to DB
            let addGuild = { guild_id: GuildInfo.guildID, guild_name: GuildInfo.guildName, guild_owner: GuildInfo.guildOwnerName, 
                guild_owner_id: GuildInfo.guildOwnerID, guild_member_count: GuildInfo.guildCount }
            let sql = 'Insert INTO Guilds Set ?';
            bot.con.query(sql, addGuild, (error, result) => {
                if (error) {console.error(err, "There was an error Insering into the guild to the DB!")}
                    console.log(`Added Guild Details for ${GuildInfo.guildName}`)
                    return result;
                })
            // Output Guild data to console in a table.
            let guildData = console.table(bot.guilds.cache.map((g) => {return { ID: g.id, Name: g.name, Members: g.memberCount}}));
            guildData;
            }else {
            console.log("Guild already in Database!");
            }
    })
    console.log('Contender connected too a new guild:');
}