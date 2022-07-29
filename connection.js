require('dotenv').config();
const mysql = require('mysql');

var con = mysql.createConnection({
  port : 	process.env.DB_PORT,
  host:  	process.env.DB_HOST,
  user:  	process.env.DB_USERNAME,
  password: process.env.db_PASSWORD,
  database: process.env.DB_NAME
});

con.connect(function(err) {
  if (err) throw err;
  console.log("database Connected!");
});

module.exports = con;

