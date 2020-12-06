"use strict";
const GuildInfoObj = require("../Classes/guildObj.js");
const RoleInfoObj = require("../Data/updRoles.js");
const ChanInfoObj = require("../Data/updChannels.js");
const embGen = require("../Classes/embedGenerator.js");
const cc = require("kleur");
module.exports = async (bot, guild) => {
  // Check Permissions
  if (
    guild.me.hasPermission([
      "MANAGE_CHANNELS",
      "MANAGE_ROLES",
      "KICK_MEMBERS",
      "BAN_MEMBERS",
      "CREATE_INSTANT_INVITE",
      "MANAGE_CHANNELS",
      "MANAGE_GUILD",
      "ADD_REACTIONS",
      "VIEW_AUDIT_LOG",
      "VIEW_CHANNEL",
      "SEND_MESSAGES",
      "MANAGE_MESSAGES",
      "EMBED_LINKS",
      "ATTACH_FILES",
      "READ_MESSAGE_HISTORY",
      "MENTION_EVERYONE",
      "VIEW_GUILD_INSIGHTS",
      "MUTE_MEMBERS",
      "MOVE_MEMBERS",
      "CHANGE_NICKNAME",
      "MANAGE_NICKNAMES",
      "MANAGE_ROLES",
      "MANAGE_WEBHOOKS",
      "MANAGE_EMOJIS",
    ])
  ) {
    console.log("Permissions Ok!");
  }

  // Get user Img
  

  // Get last created channel that the bot has send rights for:
  const validChannels = guild.channels.cache.filter((ch) => ch.type === "text");
  const validPerms = validChannels.filter((ch) =>
    ch.permissionsFor(bot.user).has("SEND_MESSAGES")
  );
  const defaultChannel = validPerms.reduce((last, ch) => {
    if (last == null) return ch;
    return ch.createdAt > last.createdAt ? ch : last;
  }, null);

  const embedGen = new embGen();
  const welcomeMsg = embedGen.generatewelMsg(bot, userImg);
  defaultChannel.send(welcomeMsg).catch(console.error);

  /**
   * Below code is for the database
   */

  // Get the guild Information
  const GuildInfo = GuildInfoObj(bot, guild);
  // Get the role obj
  const RoleInfo = RoleInfoObj(bot, guild);
  // Get the Channel Object
  const chanInfo = ChanInfoObj(bot, guild);

  // Check guildInfo isn't duplicated
  let checkID = GuildInfo.guildID;
  let search = "SELECT guild_id FROM Guilds WHERE guild_id = ?";
  bot.con.query(search, checkID, (err, res) => {
    if (err) {
      console.error(
        err,
        "There was an error Insering into the guild to the DB!"
      );
    }
    if (res.length === 0) {
      // Define Guild data for DB and insert it
      let addGuild = {
        guild_id: GuildInfo.guildID,
        guild_name: GuildInfo.guildName,
        guild_owner: GuildInfo.guildOwnerName,
        guild_owner_id: GuildInfo.guildOwnerID,
        guild_member_count: GuildInfo.guildCount,
        def_channel: defaultChannel.name,
      };
      let sql = "Insert INTO Guilds Set ?";
      bot.con.query(sql, addGuild, (error, result) => {
        if (error) {
          console.error(
            err,
            "There was an error Insering into the guild to the DB!"
          );
        }
        return result;
      });
    }
  });
  // Add roles to DB
  RoleInfo;
  // Add Channels to DB
  chanInfo;

  // Output Guild data to console in a table.
  await bot.con.query(
    "SELECT G.guild_id, G.guild_name, G.guild_owner, G.guild_owner_id, G.guild_member_count, G.guild_prefix FROM Guilds G",
    (err, result) => {
      if (err) {
        console.error("Unable to get Guild data Table: Index.js - Line 56");
      }
      console.table(result);
      console.log(cc.green(`${GuildInfo.guildName} welcomed Contender!`));
    }
  );
  // Query DB to ensure the default channel is updated. - (Refresh the DB...)
  let sql = "SELECT G.def_channel FROM Guilds G WHERE guild_id = ?";
  await bot.con.query(sql, GuildInfo.guildID, (err, result) => {
    if (err) {
      console.error(
        "Unable to get Default Channel! - guildCreate.js - Line 80"
      );
    }
    return result;
  });
};
