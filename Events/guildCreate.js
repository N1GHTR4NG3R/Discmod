'use strict'
const Discord = require('discord.js');
const con = require('../Data/dbConnect.js');
const preRoles = require('../Data/general.json');
module.exports = async (bot, guild) => {
    // Data needed to send to DB
    const guildID = guild.id;
    const guildName = guild.name;
    const guildOwnerID = guild.ownerID;
    const guildOwner = guild.owner.user.username;
    const memCount = guild.memberCount; // Possibly export this to keep it updated.

    //Get check / create Roles
        // Guild roles
        const guildRoles = guild.roles.map(r => r.name);
        // check roles
        if(guildRoles.some(name => preRoles.roleName.includes(name.toLowerCase()))){
           console.log('Match found!');
        }else {
           const mod = await guild.createRole({
                name : 'Moderator',
                color: 'BLUE',
                permissions: ['MANAGE_CHANNELS','EMBED_LINKS','ATTACH_FILES','VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES',
                                 'MANAGE_ROLES', 'KICK_MEMBERS','BAN_MEMBERS', 'CREATE_INSTANT_INVITE', 'CHANGE_NICKNAME', 
                                 'MANAGE_NICKNAMES','MANAGE_MESSAGES', 'MENTION_EVERYONE', 'ADD_REACTIONS', 'CONNECT', 'SPEAK',
                                 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD']
            })
        }
    
    // Find the Mod role:
    let modRole = guild.roles.find(r => r.name === preRoles.roleName); // Not sure if this line is needed!
    
    // Check for logs channel - If not found, create it!
    const staffArea = guild.channels.find(channel => channel.name === 'Staff Area');
    const modLogs = guild.channels.find(channel => channel.name === 'modlogs');
    if(!staffArea){
       try {
           guild.createChannel('Staff Area', {
               type: 'category',
               topic: 'Staff Area',
               permissionOverwrites : [{
                id : modRole.id,
                allow : ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES', 'MANAGE_MESSAGES','EMBED_LINKS', 'ATTACH_FILES'] 
               },
               {
                id : guild.id,
                deny : ['VIEW_CHANNEL']
                }] 
           })
       } catch (error){
        console.log(error)
       }
    } else {
    if(!modLogs){
        try{
            guild.createChannel('modlogs', {
                type: 'text',
                topic: 'Logs Channel'
            }).then(async channel => {
             let staff = guild.channels.find(c => c.name == "Staff Area" && c.type == "category");
             if (!staff){
                 console.log("Staff Area not found!");
             }else {
                 await channel.setParent(staff.id),
                 await channel.lockPermissions()
                 console.log("Staff area built and roles assigned");
             }})
         }
        catch (error){
            console.log(error)
        }
     }
    }

    // Insert Info to DB
    const guildInfo = `INSERT INTO Guilds (guild_id, guild_member_count, guild_name, guild_owner, guild_ownerid)
                         VALUES ('${guildID}', '${memCount}', '${guildName}', '${guildOwner}', '${guildOwnerID}')`;
    con.query(guildInfo, function (err, result){
        if (err) throw err;
        console.log(`Inserted Guild Details for ${guildName}`);
    })
    
    let guildData = console.table(bot.guilds.map((g) => ({ ID: g.id, Name: g.name})));
    guildData;
    // Check Permissions
    if(guild.me.hasPermission(['MANAGE_CHANNELS', 'MANAGE_ROLES'])){
       console.log('Has Permissions!');
    }
    console.log('Contender connected too a new guild:');
}