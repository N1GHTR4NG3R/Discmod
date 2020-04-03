const mysql = require('mysql');

let con = {
  host: 'localhost',
  port: '3306',
  user: '******',
  password: '*******',
  database: '*******',
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(con);
  connection.connect((err) => {
    if(err) {
      console.log('Error when connecting to DB:', err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log('Connected to DB!');
    }
  });

  connection.on('error', (err) => {
    console.log('Database error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      handleDisconnect();
    }else {
      throw err;
    }
  })
}

handleDisconnect();

module.exports = connection;