const env = require('dotenv');
env.config();

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  APP_NAME,
  SERVER_PORT,
  WEBHOOK_URL,
  SLACK_BOT_TOKEN,
} = process.env;

module.exports = {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  APP_NAME,
  SERVER_PORT,
  WEBHOOK_URL,
  SLACK_BOT_TOKEN,
}