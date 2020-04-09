const mysql = require('mysql');

let dbConfig = {
  host: '******', // Change to localhost for server
  port: '******',
  user: '******',
  password: '******',
  database: '*******',
};

//Create Connection
let con = mysql.createConnection(dbConfig);

// Establish New Connection
con.connect((err) => {
  if (err) {
    console.log('Error Connecting: ' + err.stack);
    con = reconnect(con);
  }else {
    console.log('Connected To DB');
  }
});

// Reconnect
function reconnect(con){
  console.log("Reconnecting...");
  // Destroy current connection
  if(con){
    con.destroy();
  }
  // Recreate
  con = mysql.createConnection(dbConfig);
  // Attempt to connect
  con.connect((err) => {
      if(err) {
        // Attempt every 5 seconds
        setTimeout(reconnect, 5000);
      }else {
        console.log('New Connection made to DB');
        return con;
      }
  });
}

// Error Listener
con.on('error', (err) => {
  // Server closes the connection
  if(err.code === 'PROTOCOL_CONNECTION_LOST'){
    console.log('Cannot establish connection with DB: ' + err.code);
    return reconnect(con);
  }
  // Connection in closing 
  else if(err.code === 'PROTOCOL_ENQUEUE_AFTER_QUIT'){
    console.log('Cannot establish connection with DB: ' + err.code);
    return reconnect(con);
  }
  // Fatal Error: Connection must be recreated
  else if(err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR'){
    console.log('Cannot establish connection with DB: ' + err.code);
    return reconnect(con);
  }
  // Connection already being established
  else if(err.code === 'PROTOCOL_ENQUEUE_HANDSHAKE_TWICE'){
    console.log('Cannot establish connection with DB: ' + err.code);
  }
  // Any other error
  else {
    console.log('Cannot establish connection with DB: ' + err.code);
    return reconnect(con);
  }
})

// Export 
module.exports = con;