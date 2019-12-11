const moment = require('moment');
const Log = (req, response) => {
  return {
    host: req.headers.host,
    url: req.url,
    method: req.method,
    reqDate: moment().format('YYYY.MM.DD HH:mm:SS'),
    request: req.headers,
    response,
  }
};

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