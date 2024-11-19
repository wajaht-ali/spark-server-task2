import mysql from "mysql2";

export const myDB = mysql.createConnection({
  host: process.env.mysql_host || "localhost",
  user: process.env.mysql_user || "root",
  password: process.env.mysql_password || "root123",
  database: process.env.mysql_database || "sparkdb",
});
