const moment = require('moment');
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


module.exports = {
  Log,
  Return,
};