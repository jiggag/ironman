const mysql = require('mysql');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = require('./constant');

const connection = mysql.createConnection({
  host     : DB_HOST,
  user     : DB_USER,
  password : DB_PASSWORD,
  port     : DB_PORT,
  database : DB_NAME,
});

connection.connect();

const mapper = sql => resolve => reject => {
  return connection.query(sql, function (err, rows) {
    if (!err) {
      return resolve(rows);
    }
    return reject(err);
  })
};

module.exports = mapper;