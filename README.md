# Thanks for looking at Contender Bot.
The general use case of this bot currently is to moderate your discord server. If you require any help please join here:
[Contender Discord](https://discord.gg/hyFApCR)

## Prerequisites
* Discord Client
  * Can download here: [Discord Client](https://discordapp.com/)
* Discord.js v12.1.1
  * Further information can be found here: [Discord.js](https://discord.js.org/#/)
* Node.js v12.13.1
  * Further Information can be found here: [Node.js](https://nodejs.org/en/)
* mysql - NPM Package
  * Further Information can be found here: [mysql for node](https://www.npmjs.com/package/mysql)
* mysql database
  * I use mysql however you can choose which ever you feel comfortable with.
* Text Editor
  * I use visual studio code which can be found here: [Visual Studio Code](https://code.visualstudio.com/)

## Installation
Download and install the discord client and create a user.
Create a test guild on the discord client.
Then navigate to the [Discord Developer Portal](https://discordapp.com/developers/applications) and create a new application.
Once you have inputted all relevant details, select Bot and get the Bot token.
Download and install Node.js from the link above and install on your machine.
Then you want to clone this repository to a location on your machine.
Open your text editor, or download and install the one above I have linked and open the folder you saved the clone too.
Open your terminal (Visual Studio Code allows you to use the terminal directly in the editor) and type:
`npm init` in the folder directory in your terminal.
This should then create the node modules folder within the directory, Once that is done and complete type:
`npm install discord.js` to install discord.js in this folder, and `npm install mysql` to install the mysql npm package.

You will then need to create your database layout, for reference, This is my layout currently:
- discordMod
  - Guilds
    - guild_id (varchar), guild_name (varchar), guild_owner (varchar), guild_ownerid(varchar), guild_member_count(int), guild_prefix(varchar)
  - Members
    - member_id(varchar), member_name(varchar), member_discrim(varchar), guild_id(varchar), member_chat_points(int), member_warn(int)

I use [mySql Workbench](https://www.mysql.com/products/workbench/) to build the layout of my database, however use whatever you feel comfortable with.

Then you will need to create a script called `dbConnect.js` and input your connection details and save it in the folder called Data.
An example connection script:
```
const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: '<username>',
  password: '<password>',
  database: '<databaseName>',
});

con.connect((err) => {
  if (err) {
    console.error('Error Connecting: ' + err.stack);
  }
  console.log('Connected!');
});

module.exports = con;
```
You will then want to create a file called config.json and save that in the main folder. In this file will be held the details for your bot, which you don't want to share, here is what it looks like:
```
{
    "token" : "<Your bot token>",
    "prefix" : "<your prefix>",
    "modChannels" : "modlogs",
    "botID" : "<your bots ID>"
}
```
Save the file and close it.

Now, all you should need to do is initiate the bot with `node index.js` in your terminal.

Any issues, join my discord and I will try and help.

### current events:

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

### Bot commands:

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
