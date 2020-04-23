// This file is used to grab the prefix from the database.
let con = require('./dbConnect.js');

// Grab Guild Prefix and Guild ID
function getPrefix(cb) {
    let sql = 'SELECT G.guild_id, G.guild_prefix FROM Guilds G';
    con.query(sql, (err, result) => {
    if (err) {
        console.log('Error getting Prefix Data!', undefined);
    };
    // Put data into an Array Object
    let prefixData = result.map(r => ({
        ID: r.guild_id,
        Prefix: r.guild_prefix
    }));
        cb(undefined, prefixData);
    });
}

module.exports = getPrefix;