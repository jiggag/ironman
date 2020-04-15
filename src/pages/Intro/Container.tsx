import React, { useState, useEffect, useCallback } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNKakaoLogins from '@react-native-seoul/kakao-login';
import { useNavigation } from '@react-navigation/native';
import Sentry from '@sentry/react-native';
import { RESTful, handleAlert } from '../../utils';
import styles from './styles';
import Presenter from './Presenter';
import { setAccessToken, deleteAccessToken, getAccessToken } from '../../utils/auth';

const Container = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const onLogin = useCallback(async () => {
    try {
      await setIsLoading(true);
      const { return_code, return_message, return_data } = await RESTful('GET', '/user');
      if (return_code === 200) {
        setIsLoading(false);
        return setUserInfo({ user: { ...return_data } });
      }
      return handleAlert('로그인 실패', return_message, () => {
        deleteAccessToken();
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      Sentry.captureException(error);
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[GET] (/user)', '\n', error);
    }
  }, []);

  const onJoin = useCallback(async ({ id, email, phone_number: phone }) => {
    try {
      await setIsLoading(true);
      const {
        return_code,
        return_message,
        return_data: { accessToken, ...rest },
      } = await RESTful('POST', '/user', { id, email, phone });
      if (return_code === 200) {
        await setAccessToken(accessToken);
        setIsLoading(false);
        return setUserInfo({ user: { ...rest } });
      }
      return handleAlert('회원가입 실패', return_message, () => {
        deleteAccessToken();
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      Sentry.captureException(error);
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/user)', '\n', error);
    }
  }, []);

  const onPress = useCallback(async () => {
    const token = await getAccessToken();
    if (token) {
      await onLogin();
    } else {
      await RNKakaoLogins.login((err, res) => {
        if (err) {
          setIsLoading(false);
          return;
        }
        if (res) {
          RNKakaoLogins.getProfile(async (error, result) => {
            if (error) {
              setIsLoading(false);
              return;
            }
            onJoin(result);
          });
        }
      });
    }
  }, [onLogin, onJoin]);

  useEffect(() => {
    if (userInfo) {
      navigation.navigate('ListNote');
    }
  }, [userInfo, navigation]);

  useEffect(() => {
    onPress();
  }, [onPress]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter onPress={onPress} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};
export default Container;
