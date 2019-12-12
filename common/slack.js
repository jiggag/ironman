const Slack = require('slack-node');
const { APP_NAME, WEBHOOK_URL } = require('./constant');

const slack = new Slack();
slack.setWebhook(WEBHOOK_URL);

const SLACK_TYPE = {
  LOG: 'LOG',
};

const createText = type => text => {
  switch (type) {
    case SLACK_TYPE.LOG:
      return formatLog(text);
    default:
      break;
  }
};

const formatLog = ({ title, json }) => {
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

const sendSlack = type => text => {
  slack.webhook({
    channel: `#${type.toLowerCase()}`,
    username: APP_NAME.toUpperCase(),
    text: createText(type)(text),
    icon_emoji: `:${APP_NAME.toLowerCase()}:`,
  }, (err, res) => {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = {
  sendSlack,
  SLACK_TYPE,
};