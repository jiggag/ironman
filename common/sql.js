const database = require('./database');

const GET_USER = id => database(`SELECT * FROM user WHERE id = ${id}`);
const CREATE_USER = ({ kakaoId, email, phone }) => database(`INSERT INFO user (kakao_id, email, phone) VALUES (${kakaoId}, ${email}, ${phone})`);

const GET_NOTE = userId => database(`SELECT * FROM note WHERE user_id = ${userId}`);
const GET_NOTE_DETAIL = ({ id, userId }) => database(`SELECT * FROM note WHERE id = ${id} AND user_id = ${userId}`);
const CREATE_NOTE = ({ userId, date, title, weather, food, done, etc, state }) => database(`INSERT INTO note (title, weather, food, done, etc, state, date, user_id) VALUES (${title}, ${weather}, ${food}, ${done}, ${etc}, ${state}, ${date}, ${userId})`);
const UPDATE_NOTE = ({ id, userId, date, title, weather, food, done, etc, state }) => database(`UPDATE note SET title = ${title}, weather = ${weather}, food = ${food}, done = ${done}, etc = ${etc}, state = ${state}, date = ${date} WHERE id = ${id} AND user_id = ${userId}`);
const DELETE_NOTE = ({ id, userId }) => database(`DELETE FROM note WHERE id = ${id} AND user_id = ${userId}`);

const CREATE_LOG = ({ request, response }) => database(`INSERT INFO log (request, response) VALUES (${request}, ${response})`);

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