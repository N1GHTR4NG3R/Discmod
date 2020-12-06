"use strict";
const embGen = require("../Classes/embedGenerator.js");
module.exports = {
  name: "guildinfo",
  description: "Gets guild information.",
  usage: `<prefix>guildinfo`,
  access: "Members",
  guildOnly: true,
  run(bot, message) {
    // Define user who called command
    const user = message.author;
    // Get Guild Name
    const guiName = message.guild.name;
    // Get Guild ID
    const guiID = message.guild.id;
    // Get member Count
    const memCount = message.guild.memberCount;
    // Get Guild Owner
    const guiOwner = message.guild.owner.user.username;
    // Get Guild creation date
    const guiCreate = message.guild.createdAt;
    // Get number of Channels
    const guiChan = message.guild.channels.cache.filter(
      (c) => c.type === "text"
    ).size;

    // Generate Embed
    const embedGen = new embGen();
    const giEmb = embedGen.generateguildInfoEmb(
      bot,
      user,
      memCount,
      guiName,
      guiID,
      guiOwner,
      guiCreate,
      guiChan,
      message
    );

    // Send Embed
    message.channel.send(giEmb);
  },
};
