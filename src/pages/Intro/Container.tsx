import React, { useEffect, useCallback } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNKakaoLogins from '@react-native-seoul/kakao-login';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import Presenter from './Presenter';
import { getAccessToken } from '../../utils/auth';
import { getUserRequest, postUserRequest } from '../../reducers/user';

const Container = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, isLoading } = useSelector(store => store.user);

  const onPress = useCallback(async () => {
    const token = await getAccessToken();
    if (token) {
      dispatch(getUserRequest());
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
            dispatch(postUserRequest({ id, email, phone }));
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (auth) {
      navigation.navigate('ListNote');
    }
  }, [auth, navigation]);

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
