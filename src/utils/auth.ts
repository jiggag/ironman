import Bugsnag from '@bugsnag/react-native';
import Config from 'react-native-config';
import SInfo from 'react-native-sensitive-info';

const keyObject = {
  sharedPreferencesName: Config.APP_NAME,
  keychainService: Config.KEY_CHAIN,
};

export const setAccessToken = async (accessToken) => {
  try {
    await SInfo.setItem('accessToken', accessToken, keyObject);
  } catch (e) {
    Bugsnag.notify(e);
    console.log('setAccessToken', e.message);
  }
};
export const getAccessToken = async () => {
  try {
    return SInfo.getItem('accessToken', keyObject);
  } catch (e) {
    Bugsnag.notify(e);
    console.log('getAccessToken', e.message);
  }
};
export const deleteAccessToken = () => {
  try {
    return SInfo.deleteItem('accessToken', keyObject);
  } catch (e) {
    Bugsnag.notify(e);
    console.log('ERR: deleteAccessToken', e.message);
  }
};
