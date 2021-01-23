import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { RewardedAd, RewardedAdEventType } from '@react-native-firebase/admob';
import Config from 'react-native-config';
import Presenter from './Presenter';
import styles from './styles';
import { sendVocRequest } from '../../reducers/voc';
import { VocData } from '../../types';

const rewarded = RewardedAd.createForAdRequest(Config.ADMOB_UNIT_REWARD_ID, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['face', 'Software'],
});
const Container = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(store => store.voc);
  const [state, setState] = useState({
    title: '',
    content: '',
  });

  const onPressBack = useCallback(() => navigation.goBack(), [navigation]);
  const onPress = useCallback(() => {
    rewarded.show();
  }, []);

  const onChangeText = useCallback((value: Partial<VocData>) => {
    setState(prev => ({ ...prev, ...value }));
  }, []);

  useEffect(() => {
    const eventListener = rewarded.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        console.log('reward loaded');
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log('User earned reward of ', reward);
        setState(data => {
          dispatch(sendVocRequest({ data, cb: navigation.goBack }));
          return data;
        });
      }
    });

    rewarded.load();
    return () => {
      eventListener();
    };
  }, [dispatch, navigation.goBack]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter state={state} onChangeText={onChangeText} onPress={onPress} onPressBack={onPressBack} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};

export default Container;
