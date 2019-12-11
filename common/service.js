const {
  GET_USER,
  CREATE_USER,
  GET_NOTE,
  GET_NOTE_DETAIL,
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  CREATE_LOG,
} = require('./sql');

const readNote = (userId, noteId) => {
  return new Promise((resolve, reject) => {
    GET_NOTE_DETAIL([ noteId, userId ])(resolve)(reject);
  });
};
const writeNote = (userId, data) => {
  const { title, weather, food, done, etc, state, date } = data;
  return new Promise((resolve, reject) => {
    CREATE_NOTE([ title, weather, food, done, etc, state, date, userId ])(resolve)(reject);
  });
};
const updateNote = (userId, data) => {
  const { title, weather, food, done, etc, state, date, id } = data;
  return new Promise((resolve, reject) => {
    UPDATE_NOTE([ title, weather, food, done, etc, state, date, id, userId ])(resolve)(reject);
  });
};
const deleteNote = (userId, data) => {
  return new Promise((resolve, reject) => {
    DELETE_NOTE([ data.id, userId ])(resolve)(reject);
  });
};
const readNoteList = userId => {
  return new Promise((resolve, reject) => {
    GET_NOTE([ userId ])(resolve)(reject);
  });
};
const readUser = userId => {
  return new Promise((resolve, reject) => {
    GET_USER([ userId ])(resolve)(reject)
  });
};
const writeUser = (userId, data) => {
  const { email, phone } = data;
  return new Promise((resolve, reject) => {
    CREATE_USER([ userId, email, phone ])(resolve)(reject);
  });
};
const writeLog = log => {
  const { url, method, host, reqDate, request, response } = log;
  return new Promise((resolve, reject) => {
    CREATE_LOG([ url, method, host, reqDate, JSON.stringify(request), JSON.stringify(response) ])(resolve)(reject);
  });
};
// const saveFile = (json, filepath, filename) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const exportPath = path.join(__dirname, filepath, filename);
//       fs.writeFileSync(exportPath, JSON.stringify(json), 'utf8');
//       resolve();
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

module.exports = {
  readNote,
  writeNote,
  updateNote,
  deleteNote,
  readNoteList,
  readUser,
  writeUser,
  writeLog,
};