/* eslint-disable complexity */
"use strict";
const Discord = require("discord.js");

module.exports = (bot, message) => {
  // Ignore if in DM's
  if (message.channel.type === "dm") {
    return;
  }

  // Grab logs channel
  const modLogs = message.guild.channels.cache.find(
    (ch) => ch.name === bot.defChan[message.guild.id]
  );

  // Check messages for discord invite links - Exception for ShadowRaiin's Discord.
  if (message.author.bot === true) {
    return;
  } else if (!message.member.roles.cache.some((r) => r.name === "Verified")) {
    if (
      message.content.includes("discord.gg/") ||
      message.content.includes("discordapp.com/invite") ||
      message.content.includes("discord.com/invite")
    ) {
      message.delete();
      // Declare a variable to pass Message Content to embed
      const msgContent = message.content;
      if (modLogs === undefined) {
        message.reply(
          "Do not post invites, If your allowed please speak with your Moderators!."
        );
      } else {
        modLogs
          .send(`${message.member} tried to post an invite ${msgContent}`)
          .catch(console.error);
        message.reply(
          "Do not post invites, If your allowed please speak with your Moderators!."
        );
      }
    }
  }

  // Create a cooldown collection
  const coolDown = new Discord.Collection();

  // Bots support Discord
  const invite = "https://discord.gg/Tz3mRyJ";

  // Life saving! Bug fix!!! - Forgot what this fixes now :)
  if (!message.guild) {
    return;
  }

  // Check the Prefix, Ignore if User is a bot!
  if (
    !message.content.startsWith(bot.prefix[message.guild.id]) ||
    message.author.bot
  )
    return;

  // Remove prefix and put commands into lowercase for ease
  const args = message.content
    .replace(bot.prefix[message.guild.id], "")
    .split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Check to see if there is a command and if the prefix is used!
  const command =
    bot.commands.get(commandName) ||
    bot.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;
  if (command.args && !args.length) {
    return message.channel.send(
      `${message.author} sorry, I don't recognise that command!`
    );
  }

  // Is command limited to a certain Guild
  if (command.guildOnly && message.channel.type !== "text") {
    return message.reply(
      `This command is not available here, Please join the support Discord ${invite} for more information!`
    );
  }

  // Create the cooldown and set the period
  if (!coolDown.has(command.name)) {
    coolDown.set(command.name, new Discord.Collection());
  }

  const current = Date.now();
  const timeStamp = coolDown.get(command.name);
  const timer = (command.coolDown || 5) * 1000;

  // Check authors msg time, and compare with timer!
  if (timeStamp.has(message.author.id)) {
    const expTime = timeStamp.get(message.author.id) + timer;
    // If active, Inform Author
    if (current < expTime) {
      const timeLeft = (expTime - current) / 1000;
      return message.reply(
        `Please wait another ${timeLeft.toFixed(
          1
        )} second(s), before trying again!.`
      );
    }
  }

  // Set author msg time with the timestamp
  timeStamp.set(message.author.id, current);

  // Create Timeout callback if above statement does not remove authors timeStamp.
  setTimeout(() => timeStamp.delete(message.author.id), timer);
  // If Command, Execute it!
  try {
    command.run(bot, message, args); // Arguments to export for commands!
  } catch (error) {
    console.error(error);
  }
  // If Command, delete user message
  if (command) {
    message.delete();
  }
};
