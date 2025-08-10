const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT || 3306,

    // try reconnect
    reconnect: true,
    idleTimeout: 30000,

    ssl: { rejectUnauthorized: false },
  })
  .promise();

module.exports = {
  pool,
};
