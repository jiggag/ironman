import React, { useEffect, useCallback } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNKakaoLogins from '@react-native-seoul/kakao-login';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import styles from './styles';
import Presenter from './Presenter';
import { getAccessToken } from '../../utils/auth';
import { getUserRequest, postUserRequest } from '../../reducers/user';

const Container = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, isLoading } = useSelector(store => store.user);

  const onPress = useCallback(async () => {
    const fcmToken = await messaging().getToken();
    const token = await getAccessToken();
    if (token) {
      dispatch(getUserRequest(fcmToken));
    } else {
      await RNKakaoLogins.login((err, res) => {
        if (err) {
          return;
        }
        if (res) {
          RNKakaoLogins.getProfile(async (error, result) => {
            if (error) {
              return;
            }
            const { id, email, phone_number: phone } = result;
            dispatch(postUserRequest({
              id, email, phone, fcmToken,
            }));
          });
        }
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (auth) {
      navigation.navigate('ListNote');
    }
  }, [auth, navigation]);

  useEffect(() => {
    // 백그라운드 상태에서 푸시 눌렀을때
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
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
