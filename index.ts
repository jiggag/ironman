import { AppRegistry } from 'react-native';
import AppNavigation from './src/AppNavigation';
import Sentry from '@sentry/react-native';
import Config from 'react-native-config';

Sentry.init({
  dsn: Config.SENTRY_DSN,
});

AppRegistry.registerComponent('omf', () => AppNavigation);
