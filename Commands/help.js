"use strict";
const path = require("path");
const fs = require("fs");
const embGen = require("../Classes/embedGenerator.js");
module.exports = {
  name: "help",
  description: "Command to output all the current commands and descriptions.",
  usage: `<prefix>help`,
  guildOnly: true,
  run(bot, message, args) {
    // This is needed for if someone attempts to get help
    if (args[0] == "help")
      return message.channel.send(
        `Please do ${bot.prefix[message.guild.id]}help instead.`
      );

    if (args[0]) {
      let command = args[0];
      if (bot.commands.has(command)) {
        command = bot.commands.get(command);
        const embedGen = new embGen();
        const cmdMsg = embedGen.generatecmdEmb(bot, message);
        cmdMsg.addField("**__Name:__**", `${command.name}`);
        cmdMsg.addField("__Description:__", `${command.description}`);
        cmdMsg.addField("__Usage:__", `${command.usage}`, true);
        cmdMsg.addField("__Accessable__", `${command.access}`, true);

        // Send Embed
        message.author.send(cmdMsg);
      }
    } else {
      const cmds = path.join(__dirname);
      fs.readdir(cmds, (err, files) => {
        let dirFiles = files.toString().split(".js").join(`\n`); // Convert to string and remove file ext
        let command = dirFiles.replace(/,/g, ""); // Remove commas
        if (err) throw err;
        // Define events
        const logs = {
          Voice: "Join/Leave",
          Messages: "Edit/Delete",
          Members: "Join/Leave",
        };
        // Create embed
        const embedGen = new embGen();
        const helpMsg = embedGen.generatehelpEmb(bot, message);
        // Add to embed
        helpMsg.addField(
          "**__Info:__**",
          `To get a more detailed explanation of each command please use ${
            bot.prefix[message.guild.id]
          }help <command>.`
        ),
          helpMsg.addField(
            "**__More Info:__**",
            `Alternatively join the support discord at : https://discord.gg/Tz3mRyJ `
          );
        // add code for prefix later!
        helpMsg.addField("**__Commands:__**", `${command}`, true),
          helpMsg.addField(
            "**__Logs:__**",
            `**Voice**: ${logs.Voice}\n **Messages**: ${logs.Messages}\n **Members**: ${logs.Members}`,
            true
          );
        // Send Embed
        message.author.send(helpMsg);
      });
    }
  },
};
