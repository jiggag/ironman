
const express = require('express');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const Slack = require('slack-node');

const slack = new Slack();
const app = express();
const PORT = process.env.PORT;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
slack.setWebhook(WEBHOOK_URL);

require('dotenv').config();

app.listen(PORT);
app.use(express.json());

const sendSlackOmf = log => {
  const formatting = ({ title, json }) => {
    const response = [];
    for (const key in json) {
      response.push(`\t{ ${key}: ${JSON.stringify(json[key])} },\n`);
    }
    return `
\`\`\`
${title}
{
${response.join('')}
}
\`\`\`
    `;
  };
  slack.webhook({
    channel: '#logs',
    username: 'OMF',
    text: formatting(log),
    icon_emoji: ':dog:',
  }, (err, res) => {
    if (err) {
      console.error(err);
    }
  });
};
const ROOT = '.';
const FILE_PATH = '.';
const readNote = (userId, noteId) => {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(`${ROOT}/user.json`, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }
        const response = JSON.parse(data);
        if (!response.hasOwnProperty(userId)) {
          reject('Not Found User');
        }
        if (response[userId].length < noteId) {
          reject('Not Found Note');
        }
        resolve(response[userId][noteId - 1]);
      });
    } catch (err) {
      reject(err);
    }
  });
};
const writeNote = (userId, data) => {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(`${ROOT}/user.json`, 'utf8',(err, res) => {
        if (err) {
          reject(err);
        }
        const response = JSON.parse(res);
        if (response.hasOwnProperty(userId)) {
          response[userId].push(data);
        } else {
          response[userId] = [data];
        }
        saveFile(response, FILE_PATH, 'user.json')
          .then(() => resolve())
          .catch(() => reject('Err: write note'))
          .finally(() => sendSlackOmf({
            title: 'New User',
            json: response,
          }));
      });
    } catch (err) {
      reject(err);
    }
  });
};

const updateNote = (userId, data) => {
  return new Promise((resolve, reject) => {
    try {
      const { id, ...rest } = data;
      fs.readFile(`${ROOT}/user.json`, 'utf8',(err, res) => {
        if (err) {
          reject(err);
        }
        const response = JSON.parse(res);
        if (!response.hasOwnProperty(userId)) {
          reject('Not Found User');
        }
        if (!response[userId][id - 1]) {
          reject('Not Found Note');
        }
        response[userId][id - 1] = { ...rest };
        saveFile(response, FILE_PATH, 'user.json')
          .then(() => resolve())
          .catch(() => reject('Err: update note'))
          .finally(() => sendSlackOmf({
            title: 'Update Note',
            json: response,
          }));
      });
    } catch (err) {
      reject(err);
    }
  });
};
const deleteNote = (userId, data) => {
  return new Promise((resolve, reject) => {
    try {
      const { id } = data;
      fs.readFile(`${ROOT}/user.json`, 'utf8',(err, res) => {
        if (err) {
          reject(err);
        }
        const response = JSON.parse(res);
        if (!response.hasOwnProperty(userId)) {
          reject('Not Found User');
        }
        if (!response[userId][id - 1]) {
          reject('Not Found Note');
        }
        response[userId].splice(id - 1, 1);
        saveFile(response, FILE_PATH, 'user.json')
          .then(() => resolve())
          .catch(() => reject('Err: delete note'))
          .finally(() => sendSlackOmf({
            title: 'Delete Note',
            json: response,
          }));
      });
    } catch (err) {
      reject(err);
    }
  });
};
const readUser = userId => {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(`${ROOT}/user.json`, 'utf8',(err, data) => {
        if (err) {
          reject(err);
        }
        const response = JSON.parse(data);
        resolve(response[userId] || []);
      });
    } catch (err) {
      reject(err);
    }
  });
};
const writeUser = (userId, data) => {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(`${ROOT}/user.json`, 'utf8',(err, res) => {
        if (err) {
          reject(err);
        }
        const response = JSON.parse(res);
        if (response.hasOwnProperty(userId)) {
          response[userId].push(data);
        } else {
          response[userId] = [data];
        }
        saveFile(response, FILE_PATH, 'user.json')
          .then(() => resolve())
          .catch(() => reject('Err: write user'))
          .finally(() => sendSlackOmf({
            title: 'New User',
            json: response,
          }));
      });
    } catch (err) {
      reject(err);
    }
  });
};
const writeLog = log => {
  const todayKey = moment().format('YYYY-MM-DD');
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(`${ROOT}/log.json`, 'utf8',(err, data) => {
        if (err) {
          reject(err);
        }
        const response = JSON.parse(data);
        if (!response.hasOwnProperty(todayKey)) {
          response[todayKey] = [log];
        } else {
          response[todayKey].push(log);
        }
        saveFile(response, FILE_PATH, 'log.json')
          .then(() => resolve())
          .catch(() => reject('Err: write log -> save log'))
          .finally(() => sendSlackOmf({
            title: 'New Log',
            json: response,
          }));
      });
    } catch (err) {
      reject(err);
    }
  });
};
const saveFile = (json, filepath, filename) => {
  return new Promise((resolve, reject) => {
    try {
      const exportPath = path.join(__dirname, filepath, filename);
      fs.writeFileSync(exportPath, JSON.stringify(json), 'utf8');
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};


// LOG 객체
const Log = (req, result) => {
  return {
    date: moment().format('YYYY.MM.DD HH:mm:SS'),
    host: req.headers.host,
    url: req.url,
    method: req.method,
    code: result.return_code,
    message: result.return_message,
    data: result.return_data,
  }
};
// API 리턴 객체
function Return() {
  this.return_code = null;
  this.return_message = null;
  this.return_data = null;
  this.setCode = code => {
    this.return_code = code;
    return this;
  };
  this.setMessage = message => {
    this.return_message = message;
    return this;
  };
  this.setData = data => {
    this.return_data = data;
    return this;
  };
}

app.get('/omf/user', (req, res) => {
  const result = new Return();
  readUser(req.headers.token)
    .then(data => result.setCode(200).setMessage('response success'))
    .catch(err => result.setCode(500).setMessage('response error'))
    .finally(() => {
      writeLog(Log(req, result))
        .finally(() => res.send(result));
    });
});
app.post('/omf/user', (req, res) => {
  const result = new Return();
  writeUser(req.headers.token, {})
    .then(data => result.setCode(200).setMessage('response success'))
    .catch(err => result.setCode(500).setMessage('response error'))
    .finally(() => {
      writeLog(Log(req, result))
        .finally(() => res.send(result));
    });
});
app.get('/omf/list', (req, res) => {
  const result = new Return();
  readUser(req.headers.token)
    .then(data => result.setCode(200).setMessage('response success').setData(data))
    .catch(err => result.setCode(500).setMessage('response error'))
    .finally(() => {
      writeLog(Log(req, result))
        .finally(() => res.send(result));
    });
});
app.get('/omf/note', (req, res) => {
  const result = new Return();
  readNote(req.headers.token, req.query.id)
    .then(data => result.setCode(200).setMessage('response success').setData(data))
    .catch(err => result.setCode(500).setMessage('response error'))
    .finally(() => {
      writeLog(Log(req, result)).finally(() => res.send(result));
    });
});
app.post('/omf/note', (req, res) => {
  const result = new Return();
  writeNote(req.headers.token, req.body)
    .then(data => result.setCode(200).setMessage('response success'))
    .catch(err => result.setCode(500).setMessage('response error'))
    .finally(() => {
      writeLog(Log(req, result))
        .finally(() => res.send(result));
    });
});
app.put('/omf/note', (req, res) => {
  const result = new Return();
  updateNote(req.headers.token, req.body)
    .then(data => result.setCode(200).setMessage('response success'))
    .catch(err => result.setCode(500).setMessage('response error'))
    .finally(() => {
      writeLog(Log(req, result))
        .finally(() => res.send(result));
    });
});
app.post('/omf/deleteNote', (req, res) => {
  const result = new Return();
  deleteNote(req.headers.token, req.body)
    .then(data => result.setCode(200).setMessage('response success'))
    .catch(err => result.setCode(500).setMessage('response error'))
    .finally(() => {
      writeLog(Log(req, result))
        .finally(() => res.send(result));
    });
});
