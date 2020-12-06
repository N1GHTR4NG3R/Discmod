"use strict";
const embGen = require("../Classes/embedGenerator.js");
module.exports = async (bot, message) => {
  // Partial messages do not contain content so skip them.
  if (message.partial) {
    return;
  }

  // Ignore if messages are done in DM's
  if (message.channel.type === "dm") {
    return;
  }
  // Get the logs Channel
  const modLogs = message.guild.channels.cache.find(
    (channel) => channel.name === bot.defChan[message.guild.id]
  );

  // Define an empty user to use later
  let user;

  // Get who deleted the message
  const deletor = message.guild
    .fetchAuditLogs({ type: "MESSAGE_DELETE" })
    .then((audit) => audit.entries.first());

  // Define the message
  let msg = message.content;

  //Attachment Array - Used for pictures etc...
  const attach = message.attachments.array();
  for (let i = 0; i < attach.length; i++) {
    const attachment = attach[i];
    const url = attachment.url;
    // Assign Attachments to messages
    msg += url + "\n\n";
  }

  // Check channel and if message author deleted it
  if (
    deletor.channel === message.channel.id &&
    deletor.target.id === message.author.id &&
    // Check time and count
    deletor.createdTimestamp > Date.now() - 5000 &&
    deletor.extra.count >= 1
  ) {
    user = deletor.executor.username;
  } else {
    // If checks above fail the deletor is the author
    user = message.author.username;
  }

  // Generate embed
  const embedGen = new embGen();
  const delMsg = embedGen.generateMsgDel(bot, user, message);

  // Send the log
  if (msg.startsWith(bot.prefix[message.guild.id]) || message.author.bot) {
    return;
  } else if (message.content.length <= 1024) {
    delMsg.addField("__Content:__ ", `${msg}`);
    modLogs.send(delMsg).catch(console.error);
  } else {
    // Defaults if message is an embed or system message.
    delMsg.addField(
      "__Content:__ ",
      "Most Likely an Embed,system message or message was too big \nwas deleted somewhere!"
    );
    modLogs.send(delMsg).catch(console.error);
  }
};
