import { AppRegistry } from 'react-native';
import AppNavigation from './src/AppNavigation';
import { init as SentryInit } from '@sentry/react-native';
import Config from 'react-native-config';

SentryInit({
  dsn: Config.SENTRY_DSN,
});

AppRegistry.registerComponent('omf', () => AppNavigation);
