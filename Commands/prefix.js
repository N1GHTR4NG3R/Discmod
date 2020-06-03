const cc = require("kleur");
module.exports = {
	name: "prefix",
	// Timer to avoid Spam, Useful with API's
	cooldown: 5,
	description: "Update the prefix for your guild.",
	usage: "/prefix",
	access: "Moderators",
	run(bot, message, args) {
    // Get the default channel
		const modLogs = message.guild.channels.cache.find(
			(channel) => channel.name === bot.defChan[message.guild.id]
		);

    if(!args[0]){
      message.reply("Please provide a new prefix");
    }else if(args[0].length > 3){
      message.reply("Your prefix should be no longer than 3 characters!");
    }else if(args[0].length < 3) {
      // Update the table
      let sql = "UPDATE Guilds G SET G.guild_prefix = ? WHERE G.guild_id = ?";
      let prefixUpd = args[0];
      let guildID = message.guild.id;
      try{
      bot.con.query(sql, [prefixUpd, guildID], (error, result) => {
        if(error){console.error(error, "Cannot get table to update Prefix!")}
          return result
      })
      bot.prefix[message.guild.id] = prefixUpd;
      modLogs.send(`You have just updated your prefix to: ` + bot.prefix[message.guild.id])
      }catch(e){
        console.error(e,cc.red('Cannot update Prefix!'))
      }
    }else {
      console.log("Something went wrong updating the prefix!");
    }
  }
}