const mysql = require('mysql');
require('dotenv').config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host     : DB_HOST,
  user     : DB_USER,
  password : DB_PASSWORD,
  port     : DB_PORT,
  database : DB_NAME,
});

connection.connect();

const mapper = sql => res => {
  connection.query(sql, function (err, rows) {
    res(err || rows);
  })
};

module.exports = mapper;