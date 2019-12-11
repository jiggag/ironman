const express = require('express');
const { APP_PORT, APP_NAME } = require('./constant');
const {
  readNote,
  writeNote,
  updateNote,
  deleteNote,
  readNoteList,
  readUser,
  writeUser,
  writeLog,
} = require('./service');
const { Log, Return } = require('./response');
const { sendSlack, SLACK_TYPE } = require('./slack');
const app = express();
app.listen(APP_PORT);
app.use(express.json());

app.get('/omf/user', (req, res) => {
  const result = new Return();
  readUser(req.headers.token)
    .then(data => result.setCode(200).setMessage('response success').setData(data))
    .catch(err => {
      sendSlack(SLACK_TYPE.LOG)(APP_NAME)({
        title: 'Get User',
        json: err,
      });
      result.setCode(500).setMessage('response error');
    })
    .finally(() => {
      writeLog(Log(req, result))
        .finally(() => res.send(result));
    });
});
app.post('/omf/user', (req, res) => {
  const result = new Return();
  writeUser(req.headers.token, {})
    .then(data => result.setCode(200).setMessage('response success').setData(data))
    .catch(err => {
      sendSlack(SLACK_TYPE.LOG)(APP_NAME)({
        title: 'Create User',
        json: err,
      });
      result.setCode(500).setMessage('response error');
    })
    .finally(() => {
      writeLog(Log(req, result))
        .finally(() => res.send(result));
    });
});
app.get('/omf/list', (req, res) => {
  const result = new Return();
  readNoteList(req.headers.token)
    .then(data => result.setCode(200).setMessage('response success').setData(data))
    .catch(err => {
      sendSlack(SLACK_TYPE.LOG)(APP_NAME)({
        title: 'Get Notes',
        json: err,
      });
      result.setCode(500).setMessage('response error');
    })
    .finally(() => {
      writeLog(Log(req, result))
        .finally(() => res.send(result));
    });
});
app.get('/omf/note', (req, res) => {
  const result = new Return();
  readNote(req.headers.token, req.query.id)
    .then(data => result.setCode(200).setMessage('response success').setData(data))
    .catch(err => {
      sendSlack(SLACK_TYPE.LOG)(APP_NAME)({
        title: 'Get Note Detail',
        json: err,
      });
      result.setCode(500).setMessage('response error');
    })
    .finally(() => {
      writeLog(Log(req, result)).finally(() => res.send(result));
    });
});
app.post('/omf/note', (req, res) => {
  const result = new Return();
  writeNote(req.headers.token, req.body)
    .then(data => result.setCode(200).setMessage('response success').setData(data))
    .catch(err => {
      sendSlack(SLACK_TYPE.LOG)(APP_NAME)({
        title: 'Create Note',
        json: err,
      });
      result.setCode(500).setMessage('response error');
    })
    .finally(() => {
      writeLog(Log(req, result))
        .finally(() => res.send(result));
    });
});
app.put('/omf/note', (req, res) => {
  const result = new Return();
  updateNote(req.headers.token, req.body)
    .then(data => result.setCode(200).setMessage('response success').setData(data))
    .catch(err => {
      sendSlack(SLACK_TYPE.LOG)(APP_NAME)({
        title: 'Update Note',
        json: err,
      });
      result.setCode(500).setMessage('response error');
    })
    .finally(() => {
      writeLog(Log(req, result))
        .finally(() => res.send(result));
    });
});
app.post('/omf/deleteNote', (req, res) => {
  const result = new Return();
  deleteNote(req.headers.token, req.body)
    .then(data => result.setCode(200).setMessage('response success').setData(data))
    .catch(err => {
      sendSlack(SLACK_TYPE.LOG)(APP_NAME)({
        title: 'Delete Note',
        json: err,
      });
      result.setCode(500).setMessage('response error');
    })
    .finally(() => {
      writeLog(Log(req, result))
        .finally(() => res.send(result));
    });
});
