"use strict";
const embGen = require("../Classes/embedGenerator.js");
module.exports = async (bot, oldState, newState) => {
  // Define the new user
  const nUser = newState.member.user.username;

  // Grab logs channel
  const modLogs = oldState.guild.channels.cache.find(
    (ch) => ch.name === bot.defChan[oldState.guild.id]
  );

  // Generate embed
  const embedGen = new embGen();
  const vMsg = embedGen.generatevoiceEmb(bot, newState);

  if (newState.channel == null) {
    vMsg.addField(
      "__User Disconnected:__",
      `${nUser}` + " Left " + `${oldState.channel}`
    );
    modLogs.send(vMsg).catch(console.error);
  }

  if (oldState.channel == null) {
    vMsg.addField(
      "__User Connected:__",
      `${nUser}` + " Joined " + `${newState.channel}`
    );
    modLogs.send(vMsg).catch(console.error);
  }
};
