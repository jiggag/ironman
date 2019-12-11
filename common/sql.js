const database = require('./database');

const GET_USER = param => database(`SELECT * FROM user WHERE id = ?`, param);
const CREATE_USER = param => database(`INSERT INTO user (kakao_id, email, phone) VALUES (?, ?, ?)`,param);

const GET_NOTE = param => database(`SELECT * FROM note WHERE user_id = ?`, param);
const GET_NOTE_DETAIL = param => database(`SELECT * FROM note WHERE id = ? AND user_id = ?`, param);
const CREATE_NOTE = param => database(`INSERT INTO note (title, weather, food, done, etc, state, date, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, param);
const UPDATE_NOTE = param => database(`UPDATE note SET title = ?, weather = ?, food = ?, done = ?, etc = ?, state = ?, date = ? WHERE id = ? AND user_id = ?`, param);
const DELETE_NOTE = param => database(`DELETE FROM note WHERE id = ? AND user_id = ?`, param);

const CREATE_LOG = param => database(`INSERT INTO log (url, method, host, request_date, request, response) VALUES (?, ?, ?, ?, ?, ?)`, param);

module.exports = {
  GET_USER,
  CREATE_USER,
  GET_NOTE,
  GET_NOTE_DETAIL,
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  CREATE_LOG,
};