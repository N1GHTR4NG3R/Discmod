/* eslint-disable no-async-promise-executor */
"use strict";
// Require mysql
const mysql = require("mysql");
const cc = require("kleur");

const CONFIG = {
	host: "192.168.1.163", // Change to localhost for server
	port: "3306",
	user: "ricky",
	password: "Buster-Dog0908!!",
	database: "ContenderDB",
};

// Define Connection
const createCon = () => {
	console.log("Attempting to create Connection...");
	let db = mysql.createConnection(CONFIG);
	return db;
};

const reConnect = (connection, error) =>
	new Promise((resolve) => {
		connection.destroy();
		console.log("Connection Removed!");
		console.error(cc.red(error.code));
		console.log("Retrying Connection...");
		setTimeout(() => 
resolve(), 3500);
	});

const Connect = () =>
	new Promise((resolve) => {
		const con = createCon();
		con.connect(async (err) => {
			if (err) {
				try {
					throw new Error(`Cannot establish connection with DB: ${err.code}`);
				} catch (e) {
					await reConnect(con, e);
					Connect();
				}
			} else {
				console.log("Connected!");
				return resolve(con);
			}
		});
	});

// Export Connection
module.exports.Connect = Connect;
module.exports.createConnection = createCon;
module.exports.reConnect = reConnect;