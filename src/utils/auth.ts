import Config from 'react-native-config';
import SInfo from 'react-native-sensitive-info';

const keyObject = {
  sharedPreferencesName: Config.APP_NAME,
  keychainService: Config.KEY_CHAIN
};

export const setKakaoToken = async kakaoToken => {
  try {
    await SInfo.setItem('kakaoToken', kakaoToken, keyObject);
  } catch (e) {
    console.log('setKakaoToken', e.message);
  }
};
export const getKakaoToken = () => {
  try {
    return SInfo.getItem('kakaoToken', {});
  } catch (e) {
    console.log('ERR: getKaKaoToken', e.message);
  }
};
