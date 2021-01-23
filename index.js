import React from 'react';
import { AppRegistry } from 'react-native';
import { init as SentryInit } from '@sentry/react-native';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';
import App from './src/App';

SentryInit({
  dsn: Config.SENTRY_DSN,
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    return null;
  }

  return <App />;
}

const codePushConfig = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  minimumBackgroundDuration: 60 * 3,
};
AppRegistry.registerComponent('omf', () => codePush(codePushConfig)(HeadlessCheck));
