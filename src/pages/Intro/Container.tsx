import React, { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native';
import RNKakaoLogins from 'react-native-kakao-logins';
import { RESTful, handleAlert } from '../../utils';
import styles from './styles';
import Presenter from './Presenter';
import { setAccessToken, deleteAccessToken, getAccessToken } from '../../utils/auth';

export const kakaoType = {
  JOIN: 'join',
  LOGIN: 'login',
};

const Container = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const onPress = async type => {
    await setIsLoading(true);
    const token = await getAccessToken();
    if (token) {
      await onLogin();
    } else {
      await setIsLoading(false);
      await RNKakaoLogins.login((err, res) => {
        if (err) {
          console.log('%c%s', 'background: #00ff00; color: #ffffff', '카카오 로그인 실패', err.toString());
          return;
        }
        if (res) {
          RNKakaoLogins.getProfile(async (error, result) => {
            if (error) {
              console.log('%c%s', 'background: #00ff00; color: #ffffff', '카카오 프로필조회 실패', error.toString());
              return;
            }
            await setIsLoading(true);
            switch (type) {
              case kakaoType.JOIN:
                await onJoin(result);
                break;
              case kakaoType.LOGIN:
                await onLogin();
                break;
              default:
                break;
            }
          })
        }
      });
    }
  };

  const onLogin = async () => {
    try {
      const { return_code, return_message, return_data } = await RESTful('GET', `/user`);
      if (return_code === 200) {
        setIsLoading(false);
        return setUserInfo({ user: { ...return_data }});
      }
      return handleAlert('로그인 실패', return_message, () => {
        deleteAccessToken();
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[GET] (/user)', '\n', error);
    }
  };
  const onJoin = async ({ id, email, phone_number: phone }) => {
    try {
      const { return_code, return_message, return_data: { accessToken, ...rest } } = await RESTful('POST', '/user', { id, email, phone });
      if (return_code === 200) {
        await setAccessToken(accessToken);
        setIsLoading(false);
        return setUserInfo({ user: { ...rest }});
      }
      return handleAlert('회원가입 실패', return_message, () => {
        deleteAccessToken();
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/user)', '\n', error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigation.navigate('ListNote');
    }
  }, [userInfo]);

  useEffect(() => {
    onPress('login');
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter onPress={onPress} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};
export default Container;
