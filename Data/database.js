/* eslint-disable no-async-promise-executor */
"use strict";
// Require mysql
const mysql = require("mysql");
const errColour = require("kleur");
 
const CONFIG = {
  host: "****", // Change to localhost for server
  port: "****",
  user: "****",
  password: "****",
  database: "****",
};
 
// Define Connection
const createCon = () => {
  console.log("Attempting to create Connection...");
  let db = mysql.createConnection(CONFIG);
  return db;
};

const reConnect = (connection, error) => new Promise((resolve) => {
  connection.destroy();
  console.log("Connection Removed!");
  console.error(errColour.red(error.code));
  console.log("Retrying Connection...");
  setTimeout(() => resolve(), 3500);
})

const Connect = () => new Promise((resolve) => {
    const con = createCon();
      con.connect(async(err) => {
        if (err) {
            try{
            throw new Error(`Cannot establish connection with DB: ${err.code}`);
            }catch(e){
              await reConnect(con, e)
              Connect();
            }
        } else {
          console.log("Connected!")
          return resolve(con)
        }
    });
});

// Export Connection
module.exports.Connect = Connect;
module.exports.createConnection = createCon;
module.exports.reConnect = reConnect;
