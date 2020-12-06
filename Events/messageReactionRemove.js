"use strict";
const embGen = require("../Classes/embedGenerator.js");

module.exports = async (bot, reaction, user) => {
  // Ignore if messages are done in DM's
  if (reaction.message.channel.type === "dm") {
    return;
  }
  // Fetch and cache the message
  if (reaction.message.partial) {
    await reaction.message.fetch();
  }

  // Check to see if user is Bot
  if (user.bot) {
    return;
  }
  // If user is reacting but not in the guild, Ignore them.
  if (!reaction.message.guild) {
    return;
  }
  // Get the logs Channel
  const modLogs = reaction.message.guild.channels.cache.find(
    (channel) => channel.name === bot.defChan[reaction.message.guild.id]
  );

  // Show me the Honey
  if (reaction.message.guild.id === "755077691274690711") {
    if (reaction.message.id === "755097981593714778") {
      const emojis_rolename = {
        "☠️": "MERC_ROLE",
        "📈": "TRADER_ROLE",
        "🏗️": "SKILLS_ROLE",
      };
      const roles = {
        MERC_ROLE: { id: "755079595317002281", desc: "Merc Role" },
        TRADER_ROLE: { id: "755077865648685116", desc: "Trader Role" },
        SKILLS_ROLE: { id: "755079320644354139", desc: "Skills Role" },
      };
      const rolename = emojis_rolename[reaction.emoji.name];
      //Define the embeds
      const embedGen = new embGen();
      const roleRemMess = embedGen.generateroleRemMess(
        bot,
        user,
        roles[rolename]
      );

      const removeRole = async (reaction, user, role) => {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove(role.id);
      };

      try {
        await removeRole(reaction, user, roles[rolename]);
        modLogs.send(roleRemMess).catch(console.error);
      } catch {
        console.log(
          `Unable to remove ${roles[rolename].desc} from ${user.username}`
        );
      }
    }
  }

  // Spektre Trade
  if (reaction.message.guild.id === "483139339514019840") {
    if (reaction.message.id === "763112012510658592") {
      const emojis_rolename = {
        "762426389449408614": "Investor_ROLE", // Piechart Emoji
        "511722865700110376": "Cryptocurrency_ROLE", // BTC Emoji
        "762426374552027146": "Trader_ROLE", // Candlesticks Chart
        "762427644855713792": "Stocks_ROLE", // Spektre Emoji
      };
      const roles = {
        Investor_ROLE: { id: "762940195045638145", desc: "Investor Role" },
        Trader_ROLE: { id: "762939939460743169", desc: "Trader Role" },
        Cryptocurrency_ROLE: { id: "762940337269637120", desc: "Crypto Role" },
        Stocks_ROLE: { id: "762940442236813312", desc: "Stocks Role" },
      };
      const rolename = emojis_rolename[reaction.emoji.id];
      //Define the embeds
      const embedGen = new embGen();
      const roleRemMess = embedGen.generateroleRemMess(
        bot,
        user,
        roles[rolename]
      );

      const removeRole = async (reaction, user, role) => {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove(role.id);
      };

      try {
        await removeRole(reaction, user, roles[rolename]);
        modLogs.send(roleRemMess).catch(console.error);
      } catch (error) {
        console.log(
          `Unable to remove ${roles[rolename].desc} from ${user.username}`
        );
        console.error(error);
      }
    }
  }
};
