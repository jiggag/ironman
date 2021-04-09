import React, { useEffect, useCallback } from 'react';
import Bugsnag from '@bugsnag/react-native';
import messaging from '@react-native-firebase/messaging';
import { login, getProfile, KakaoProfile } from '@react-native-seoul/kakao-login';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import _constant from 'lodash/constant';
import { getUserRequest, postUserRequest } from '@reducers/user';
import { getAccessToken } from '@utils/auth';
import { handleAlert } from '@utils/index';
import { RootReducer } from '../../types';
import Presenter from './Presenter';
import styles from './styles';

interface Profile extends KakaoProfile {
  id: string | null;
}
const Container = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, isLoading } = useSelector((store: RootReducer) => store.user);

  const onPress = useCallback(async () => {
    const fcmToken = await messaging().getToken();
    const token = await getAccessToken();
    if (token) {
      dispatch(getUserRequest({ fcmToken }));
    } else {
      try {
        const isLogin = await login();
        if (!isLogin) {
          throw new Error('카카오 로그인 실패');
        }
        const { email, phoneNumber: phone, id } = (await getProfile()) as Profile;
        dispatch(
          postUserRequest({
            id,
            email,
            phone,
            fcmToken,
          }),
        );
      } catch (err) {
        Bugsnag.notify(err);
        handleAlert('알림', '카카오 로그인에 실패하였습니다', _constant(null));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (auth) {
      navigation.navigate('ListNote');
    }
  }, [auth, navigation]);

  useEffect(() => {
    // 백그라운드 상태에서 푸시 눌렀을때
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification caused app to open from background state:', remoteMessage);
      if (remoteMessage?.data?.navigation) {
        const routes = JSON.parse(remoteMessage?.data?.navigation);
        if (routes?.length) {
          navigation.dispatch(
            CommonActions.reset({
              index: routes.length - 1,
              routes,
            }),
          );
        }
      }
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      await onPress();
    })();
  }, [onPress]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter onPress={onPress} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};
export default Container;
