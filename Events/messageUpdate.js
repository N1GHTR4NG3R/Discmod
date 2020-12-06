"use strict";
const embGen = require("../Classes/embedGenerator.js");

module.exports = async (bot, oldMessage, newMessage) => {
  // Partial messages do not contain content so skip them.
  if (oldMessage.partial) {
    await oldMessage.fetch();
  }
  // Check if Bot?
  if (newMessage.author.bot) return;

  // Find logs Channel
  const modLogs = newMessage.guild.channels.cache.find(
    (channel) => channel.name === bot.defChan[oldMessage.guild.id]
  );

  // Create an empty user var
  let user;

  // Define entry for later
  let entry;

  // Message Variable
  if (oldMessage.content === newMessage.content) return;

  // Message Editor
  const userEdit = newMessage.guild
    .fetchAuditLogs({ type: "MESSAGE_UPDATE" })
    .then((audit) => audit.entries.first());

  // Get Channel ID and if Original author edited it
  if (
    userEdit.channel === newMessage.channel.id &&
    userEdit.target.id === newMessage.author.id &&
    // Check time and the count
    entry.createdTimestamp > Date.now() - 5000 &&
    entry.extra.count >= 1
  ) {
    user = entry.executor.username;
  } else {
    // If fails, the editor is the author
    user = newMessage.author.username;
  }

  const embedGen = new embGen();
  const edMsg = embedGen.generateedMess(bot, user, oldMessage, newMessage);

  // Send msg embed
  if(oldMessage.content.length <= 1024 && newMessage.content.length <= 1024){
    modLogs.send(edMsg).catch(console.error);
  }else {
    modLogs.send(`${user}'s message is too big to output.`);
  }
  
};
