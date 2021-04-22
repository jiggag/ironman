import { AppEventsLogger } from 'react-native-fbsdk-next';

export const logEvent = log => {
  AppEventsLogger.logEvent(log);
};
