const express = require('express');
const { APP_PORT } = require('./constant');
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
const { Log, Return } = require('./response');
const { sendSlack, SLACK_TYPE } = require('./slack');
const app = express();
app.listen(APP_PORT);
app.use(express.json());

const readNote = (userId, noteId) => {
  return new Promise((resolve, reject) => {
    GET_NOTE_DETAIL({ id: noteId, userId })(resolve)(reject);
  });
};
const writeNote = (userId, data) => {
  return new Promise((resolve, reject) => {
    CREATE_NOTE({ userId, ...data })(resolve)(reject);
  });
};
const updateNote = (userId, data) => {
  return new Promise((resolve, reject) => {
    UPDATE_NOTE({ userId, ...data })(resolve)(reject);
  });
};
const deleteNote = (userId, data) => {
  return new Promise((resolve, reject) => {
    DELETE_NOTE({ userId, id: data.id })(resolve)(reject);
  });
};
const readNoteList = userId => {
  return new Promise((resolve, reject) => {
    GET_NOTE(userId)(resolve)(reject);
  });
};
const readUser = userId => {
  return new Promise((resolve, reject) => {
    GET_USER(userId)(resolve)(reject)
  });
};
const writeUser = (userId, data) => {
  return new Promise((resolve, reject) => {
    CREATE_USER({ kakaoId: userId, ...data })(resolve)(reject);
  });
};
const writeLog = log => {
  return new Promise((resolve, reject) => {
    CREATE_LOG()(resolve)(reject);
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

app.get('/omf/user', (req, res) => {
  const result = new Return();
  readUser(req.headers.token)
    .then(data => result.setCode(200).setMessage('response success'))
    .catch(err => {
      sendSlack(SLACK_TYPE.LOG)(SERVICE_NAME.OMF)({
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
    .then(data => result.setCode(200).setMessage('response success'))
    .catch(err => {
      sendSlack(SLACK_TYPE.LOG)(SERVICE_NAME.OMF)({
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
      sendSlack(SLACK_TYPE.LOG)(SERVICE_NAME.OMF)({
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
      sendSlack(SLACK_TYPE.LOG)(SERVICE_NAME.OMF)({
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
    .then(data => result.setCode(200).setMessage('response success'))
    .catch(err => {
      sendSlack(SLACK_TYPE.LOG)(SERVICE_NAME.OMF)({
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
    .then(data => result.setCode(200).setMessage('response success'))
    .catch(err => {
      sendSlack(SLACK_TYPE.LOG)(SERVICE_NAME.OMF)({
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
    .then(data => result.setCode(200).setMessage('response success'))
    .catch(err => {
      sendSlack(SLACK_TYPE.LOG)(SERVICE_NAME.OMF)({
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
