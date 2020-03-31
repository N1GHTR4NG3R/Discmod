# Thanks for looking at Contender Bot.
The general use case of this bot currently is to moderate your discord server. If you require any help please join here:
[Contender Discord](https://discord.gg/hyFApCR)

### The current events are:
guildCreate - The actions to take when joining a guild, primarilly checking for a staff area and a "modlogs" channel, 
then creating if they aren't there and assigning the relevant roles on creation, inputting the guild information onto the DB.

guildDelete - The actions to take when leaving a guild, primarilly removing the guild information from the DB.

guildMemberAdd - The actions to take when a member joins a guild, primarilly outputting a log into modlogs, and updating the DB with
the members information for the relevant guild.

guildMemberRemove - The actions taken when a member leaves a guild, primarilly outputting a log into modlogs, and removing the member
details from the DB.

message - The message event handler to differentiate between bot commands and actual messages, so the bot doesn't continuosly respond to
everyone, and ensuring that replies from other bots are ignored.

messageDelete - The actions to take when a message is deleted, primarilly grabbing the deleted message and outputting it into the moderation channel, the purpose of this is for guild staff / mods be able to identify any harrassment claims that may happen and take action.

messageUpdate - The actions to take when a message is edited, primarilly grabbing the edited message and outputting it into the moderation channel, with the exception of the before / after messages being shown. The purpose of this is for guild staff / mods be able to identify any harrassment claims that may happen and take action.

voiceStateUpdate - The actions to take when a voice channel is entered left, currently outputs a member join / leave into the modlogs, In future updates it will allow a way to keep track of who is most active within the voice channels, to complement guildstats.

Bot warning - If another bot joins the discord, It will output a warning log to notify staff, If staff have invited it, you can ignore it,Unfortunately selfBots can't be detected this way, so normal "Human" detection rates have to be applied, although I will be working on a way to hopefully keep self-bots out.

### Database Interactivity

The bot is connected to a database to log information about guilds and members. The information it logs is as follows:

Guilds: 
* guild id
* guild name
* guild owner
* guild owner id
* guild member count
* guild prefix

Members:
* member id
* member name (The discord name you use)
* member discriminator (the number after your username i.e Nightranger#8080)
* guild id (to associate the member with the relevant guild)
* member chat points (For future updates to reward the most active chat members)
* member warn points (For future updates to introduce a warning system)

Current Bot commands are as follows:

* kick - To kick a member from your guild
* softban - To ban a user from your guild, then unban them immediately after to remove the chat history 
* ban - To ban a member from your guild
* guildinfo - To display current information about your guild
* invite - to create a temporary invite with a limited time period and limited uses
* perminvite - to create a permanent invite
* ping - to display the members ping to the bot, the bots ping to the API, and the current uptime for the bot
* reload - Bot developers only to reload commands after updating them, to minimise bot downtime.

Note: The invite commands will DM the user the invite and output it to the modlogs channel for tracking purposes (To help identify where selfbots are coming from).
It would be good practise to disallow users to create invites via the traditional way, and allow the bot to create them.

Additional Note: The invites and kick, softban, ban commands all require reasons before they are processed, this can help ensure that guild owners know why people are
creating invites or being punished by moderators+.

Currently no additional or personal identifiable information is being held, and I do not plan on adding any information that can personally identify anyone, additional 
information may be needed in the future for future command implementations etc, so be sure to check this repository to keep up to date.
