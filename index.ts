import { AppRegistry } from 'react-native';
import { init as SentryInit } from '@sentry/react-native';
import Config from 'react-native-config';
import AppNavigation from './src/AppNavigation';

SentryInit({
  dsn: Config.SENTRY_DSN,
  enableNative: !Config.IS_DEBUG,
});

AppRegistry.registerComponent('omf', () => AppNavigation);
