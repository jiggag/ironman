import { AppRegistry } from 'react-native';
import { init as SentryInit } from '@sentry/react-native';
import Config from 'react-native-config';
import AppNavigation from './src/AppNavigation';

require('react-native').unstable_enableLogBox();

SentryInit({
  dsn: Config.SENTRY_DSN,
});

AppRegistry.registerComponent('omf', () => AppNavigation);
