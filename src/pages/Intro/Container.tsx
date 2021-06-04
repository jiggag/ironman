import React, {
  useEffect, useCallback, useMemo, useRef,
} from 'react';
import { Animated, StatusBar } from 'react-native';
import Bugsnag from '@bugsnag/react-native';
import messaging from '@react-native-firebase/messaging';
import { login, getProfile, KakaoProfile } from '@react-native-seoul/kakao-login';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useDynamicValue } from 'react-native-dynamic';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import _constant from 'lodash/constant';
import { getUserRequest, postUserRequest } from '@reducers/user';
import { getAccessToken } from '@utils/auth';
import { Theme } from '@utils/constants';
import { handleAlert } from '@utils/index';
import { RootReducer } from '../../types';
import Presenter from './Presenter';
import { dynamicStyles, BUTTON_HEIGHT } from './styles';

interface IntroProps {
  setShowBanner: (isShow: boolean) => void;
}

interface Profile extends KakaoProfile {
  id: string | null;
}

const Container = ({ setShowBanner }: IntroProps) => {
  const styles = useDynamicValue(dynamicStyles);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();
  const { auth, isLoading } = useSelector((store: RootReducer) => store.user);

  const animatedHeight = useRef(new Animated.Value(0));
  const animatedStyle = useMemo(
    () => ({
      transform: [
        {
          translateY: animatedHeight.current.interpolate({
            inputRange: [0, 1],
            outputRange: [BUTTON_HEIGHT + bottom, 0],
          }),
        },
      ],
      ...styles.loginPopup,
      height: BUTTON_HEIGHT + bottom,
    }),
    [bottom, styles.loginPopup],
  );

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
      Animated.timing(animatedHeight.current, {
        useNativeDriver: true,
        toValue: 0,
        duration: 500,
      }).start(() => {
        setShowBanner(true);
        navigation.navigate('ListNote');
      });
    } else {
      setShowBanner(false);
    }
  }, [auth, navigation, setShowBanner]);

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
    setTimeout(() => {
      Animated.timing(animatedHeight.current, {
        useNativeDriver: true,
        toValue: 1,
        duration: 500,
      }).start();
    }, 1000);
  }, [onPress]);

  return (
    <SafeAreaView edges={['top']} style={styles.safeAreaView}>
      <StatusBar backgroundColor={useDynamicValue(Theme.light.base, Theme.dark.base)} barStyle="light-content" />
      <Presenter onPress={onPress} animatedStyle={animatedStyle} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};
export default Container;
