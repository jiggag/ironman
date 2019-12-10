require('dotenv').config();

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  PORT: APP_PORT,
  WEBHOOK_URL,
} = process.env;

module.exports = {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  APP_PORT,
  WEBHOOK_URL,
}