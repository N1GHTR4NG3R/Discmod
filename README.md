# Contender
 Discord Moderation Bot and multi-purpose gaming bot

Thanks for looking at my repository

The general use case of this bot is to moderate your discord server. So far the usage spans these events.

# Joining a guild 
When the bot joins your server, It will check for a staff area category with a channel called modlogs, If you have
a staff area, but no modlogs channel it will create it, and if you don't have a staff area, It will also create that. It then checks
for a moderation role that is pre-defined within the general.json file, If no match id found, It will create the role "Moderator" and
assign basic permissions needed for a moderator, It then ties this role to the staff area category, which in turn, the modlogs channel
is locked to the same permissions as the staff area. No input is needed from the user, other than inviting the bot. At this point the bot will add the GuildID, GuildName, GuildMemberCOunt, GuildOwner and GuildOwnerID to the database. It also has guildPrefix here, for a webapp to be built later on to change this, and a few other features.

# Member Join / leave logs 
The bot will log when a member joins or leaves the guild, outputting their username, avatar and date/time they left, This can
be useful in helping to track down when your server just got raided by bots, or if someone you like has decided to leave for
whatever reason.

# Edited messages 
The bot will log old and new messages when someone edits a message, This is useful if someone has been harrassing, trolling
or generally inflaming other community members and decides to edit their message in an attempt to cover it up to avoid 
repurcusions from guild staff.

# Deleted Messages 
Will log the deleted message and/or attachment URL. Note: If an attachment is deleted, It outputs a URL that leads to Discords Databse, which will error with permission denied. I have chosen not to save these to a database for a multitude of reasons.

# Voice Join / Leave logs 
Will log when a user joins or leaves a voice channel, stating the user and the voice channel joined.

# Bot warning 
If another bot joins the discord, It will output a warning log to notify staff, If staff have invited it, can ignore it,
Unfortunately selfBots can't be detected this way, so normal "Human" detection is required for selfbots.

# Database Interactivity 
Currently logs guildID, guildName, owner, ownerID, memberCount and prefix (Prefix isn't used yet)...
This will get updated as more functionality is used.

# Kick/ Ban Log
Outputs a log if a member is kicked or banned using the bot, It is hit and miss to get this from the audit logs, so for better persistence, use the bot to log it.

# Kick / SoftBan / Ban
Have the option to kick, softban and ban members - Softban is where you ban and then immediatly unban them, which automatically deletes
the last 24hrs of messages from the user, on your guild.

# Future Plans
These are the following things I plan to implement:
 -- Make some commands guild only
 -- Log when a member creates an invite code == Partial
 -- Log when a channel is created / edited
 -- Assign roles through emojis
 -- Message deletion / purge (max 100 messages)
 -- Donation acceptance
 -- Import Social feed data (Twitch, Instagram etc)
 -- Import data from other sites (News feeds etc)
 -- Welcome message, stating rules and ToS
 -- Link and Discord Invite detection, maybe separate them
      (whitelist/blacklist)
 -- Allow a user to temporarily bypass moderation rules
      (Useful for stream links)
 -- Ability to warn with a command 
    Tally warnings and after 3 warnings will kick/ban
    (SoftBan on first offense)
 -- Apply roles through reactions

# Of course, I have more plans than this, but this should keep me going for now.
feel free to contribute, make suggestions and/or use the bot, but make sure to link to this repo and credit me.

Thanks for your time!.

