const cc = require("kleur");
module.exports = {
  name: "logchan",
  // Timer to avoid Spam, Useful with API's
  cooldown: 5,
  description: "Update the logs channel for your guild.",
  usage: `<prefix>logchan`,
  access: "Moderators+",
  run(bot, message, args) {
    // Grab the logs channel
    const modLogs = message.guild.channels.cache.find(
      (channel) => channel.name === bot.defChan[message.guild.id]
    );

    // Update Channel
    if (!args[0]) {
      message.reply("Please provide a new channel name");
    } else if (args[0].length > 45) {
      message.reply(
        "Your channel name should not be longer than 45 characters!"
      );
    } else if (args[0].length < 45) {
      // Update the table
      let sql = "UPDATE Guilds G SET G.def_channel = ? WHERE G.guild_id = ?";
      let channelUpd = args[0];
      let guildID = message.guild.id;
      try {
        bot.con.query(sql, [channelUpd, guildID], (error, result) => {
          if (error) {
            console.error(
              error,
              "Cannot update default Channel! - logchan.js line 29"
            );
          }
          return result;
        });
        bot.defChan[message.guild.id] = channelUpd;
        modLogs.send(
          `You have updated your logs channel too: ${
            bot.defChan[message.guild.id]
          }`
        );
      } catch (e) {
        console.error(
          e,
          cc.red("You were unable too update your logs channel!")
        );
      }
    } else {
      console.log("Something screwed up updating the default channel!");
    }
  },
};
