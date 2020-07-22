import React from 'react';
import { AppRegistry } from 'react-native';
import { init as SentryInit } from '@sentry/react-native';
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

AppRegistry.registerComponent('omf', () => HeadlessCheck);
