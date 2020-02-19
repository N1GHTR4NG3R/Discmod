Thanks for looking at Contender Bot

The general use case of this bot is to moderate your discord server. So far the usage spans these events.

Joining a guild == When the bot joins your server, It will check for a staff area category with a channel called modlogs, If you have
a staff area, but no modlogs channel it will create it, and if you don't have a staff area, It will also create that. It then checks
for a moderation role that is pre-defined within the general.json file, If no match id found, It will create the role "Moderator" and
assign basic permissions needed for a moderator, It then ties this role to the staff area category, which in turn, the modlogs channel
is locked to the same permissions as the staff area. No input is needed from the user, other than inviting the bot.

Member Join / leave logs == The bot will log when a member joins or leaves the guild, outputting their username, avatar and date/time they
left, This can be useful in helping to track down when your server just got raided by bots, or if someone you like has decided to leave for
whatever reason.

Edited messages == The bot will log old and new messages when someone edits a message, This is useful if someone has been harrassing, trolling
or generally inflaming other community members and decides to edit their message in an attempt to cover it up to avoid repurcusions from guild
staff.

Deleted Messages == Will log the deleted message and/or attachment URL (With direct upload Images, it attempts to link to the attachment, but fails,
I have chosen not too pursue logging the direct upload attachments, due to laws that I would not rather not have backfire onto me, when I am trying
to help make communities a safer place, It is possible, and feel free to amend the code if needed - But I accept no liability or responsibility).

Voice Join / Leave logs == Will log when a user joins or leaves a voice channel, stating the user and the voice channel.

Bot warning == If another bot joins the discord, It will output a warning log to notify staff, If staff have invited it, can ignore it,
Unfortunately selfBots can't be detected this way, so normal "Human" detection rates can.

Database Interactivity == Currently logs guildID, guildName, owner, ownerID, and memberCount...

Kick Log == Outputs a log if a member is kicked