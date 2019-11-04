import React, { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { View, Text, SafeAreaView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RNKakaoLogins from 'react-native-kakao-logins';
import { RESTful, handleAlert } from '../../utils';
import styles from './styles';
import Presenter from './Presenter';
import { setKakaoToken } from '../../utils/auth';

export const kakaoType = {
  JOIN: 'join',
  LOGIN: 'login',
};

const Container = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const onPress = async type => {
    await setIsLoading(true);
    await RNKakaoLogins.login((err, res) => {
      if (err) {
        console.log('%c%s', 'background: #00ff00; color: #ffffff', '카카오 로그인 실패', err.toString());
        return;
      }
      if (res) {
        RNKakaoLogins.getProfile((error, result) => {
          if (error) {
            console.log('%c%s', 'background: #00ff00; color: #ffffff', '카카오 프로필조회 실패', error.toString());
            return;
          }
          // 가져온 토큰으로 회원가입 혹은 로그인
          switch (type) {
            case kakaoType.JOIN:
              onJoin(result);
              break;
            case kakaoType.LOGIN:
              onLogin(result);
              break;
            default:
              break;
          }
        })
      }
    });
    setIsLoading(false);
  };

  const onLogin = async ({ id: kakaoId }) => {
    try {
      await setKakaoToken(kakaoId);
      const { return_code, return_message, return_data } = await RESTful('GET', `/user`);
      console.log('%c%s', 'background: #00ff00; color: #ffffff', { return_code, return_message, return_data });
      if (return_code === 200) {
        return setUserInfo({ user: { ...return_data }});
      }
      return handleAlert('로그인 실패', return_message, () => null);
    } catch (error) {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[GET] (/user)', '\n', error);
    }
  };
  const onJoin = async ({ id: kakaoId, email, phone_number: phone }) => {
    try {
      await setKakaoToken(kakaoId);
      const { return_code, return_message, return_data } = await RESTful('POST', '/user', { email, phone });
      console.log('%c%s', 'background: #00ff00; color: #ffffff', return_code, return_message, return_data);
      if (return_code === 200) {
        return setUserInfo({ user: { ...return_data }});
      }
      return handleAlert('회원가입 실패', return_message, () => null);
    } catch (error) {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/user)', '\n', error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      Actions.listNote();
    }
  }, [userInfo]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter onPress={onPress} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};
export default Container;