
const express = require('express');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const Slack = require('slack-node');
const bodyParser = require('body-parser');

const slack = new Slack();
const app = express();
const PORT = process.env.PORT;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
slack.setWebhook(WEBHOOK_URL);

require('dotenv').config();

app.listen(PORT);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sendSlackOmf = message => {
  slack.webhook({
    channel: '#logs',
    username: 'OMF',
    text: message,
    icon_emoji: ':dog:',
  }, (err, res) => {
    if (err) {
      console.error(err);
    }
  });
};

const readUser = userId => {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile('./user.json', (err, data) => {
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
      fs.readFile('./user.json', (err, data) => {
        if (err) {
          reject(err);
        }
        const response = JSON.parse(data);
        if (response.hasOwnProperty(userId)) {
          response[userId].push(data);
        } else {
          response[userId] = [data];
        }
        saveFile(response, '.', 'user.json')
          .then(() => resolve())
          .catch(() => reject('Err: write user'));
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
      fs.readFile('./log.json', (err, data) => {
        if (err) {
          reject(err);
        }
        const response = JSON.parse(data);
        if (!response.hasOwnProperty(todayKey)) {
          response[todayKey] = [log];
        } else {
          response[todayKey].push(log);
        }
        saveFile(response, '.', 'log.json')
          .then(() => resolve())
          .catch(() => reject('Err: write log -> save log'));
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
      sendSlackOmf(`saveFile: ${JSON.stringify(json)}`);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

app.get('/omf/user', (req, res) => {
  const result = {};
  sendSlackOmf(`get omf/user = ${req.url}`);
  readUser(req.query.kakaoId)
  .then(data => {
    result.return_message = 'response success';
    result.return_code = 200;
    result.return_data = data;
  }).catch(err => {
    result.return_message = 'response error';
    result.return_code = 500;
  }).finally(() => {
    writeLog({
      date: moment().format('YYYY.MM.DD HH:mm:SS'),
      host: req.headers.host,
      url: req.url,
      method: req.method,
    }).finally(() => res.send(result));
  });
});
app.post('/omf/user', (req, res) => {
  const result = {};
  sendSlackOmf(`omf/user = ${req.body.kakaoId}`);
  writeUser(req.body.kakaoId, {})
  .then(data => {
    result.return_message = 'response success';
    result.return_code = 200;
    result.return_data = 'join';
  }).catch(err => {
    result.return_message = 'response error';
    result.return_code = 500;
  }).finally(() => {
    writeLog({
      date: moment().format('YYYY.MM.DD HH:mm:SS'),
      host: req.headers.host,
      url: req.url,
      method: req.method,
    }).finally(() => res.send(result));
  });
});
app.get('/omf/list', (req, res) => {
  const result = {};
  readUser(req.query.kakaoId)
  .then(data => {
    result.return_message = 'response success';
    result.return_code = 200;
    result.return_data = data;
  }).catch(err => {
    result.return_message = 'response error';
    result.return_code = 500;
  }).finally(() => {
    writeLog({
      date: moment().format('YYYY.MM.DD HH:mm:SS'),
      host: req.headers.host,
      url: req.url,
      method: req.method,
    }).finally(() => res.send(result));
  });
});
app.get('/omf/note', (req, res) => {
  res.send({
    return_message: 'response success',
    return_code: 200,
    return_data: [],
  });
});
app.post('/omf/note', (req, res) => {
  res.send({
    return_message: 'response success',
    return_code: 200,
    return_data: 'note',
  });
});