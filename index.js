import React from 'react';
import { AppRegistry } from 'react-native';
import Bugsnag from '@bugsnag/react-native';
import codePush from 'react-native-code-push';
import { codeBundleId } from './package.json';
import App from './src/App';

Bugsnag.start({ codeBundleId });

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
