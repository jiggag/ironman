import React, { useEffect, useCallback, useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { BackHandler, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import admob, { MaxAdContentRating, BannerAdSize, BannerAd, TestIds } from '@react-native-firebase/admob';
import styles from './styles';
import Presenter from './Presenter';
import { handleConfirm } from '../../utils';
import { deleteAccessToken } from '../../utils/auth';
import { getListRequest } from '../../reducers/note';
import Config from 'react-native-config';

let isBackPress = false;
const Container = ({ route: { params } }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { list, graph, isLoading } = useSelector(store => store.note);
  const [isShowBanner, setIsShowBanner] = useState(false);
  const getList = useCallback(isPaging => dispatch(getListRequest(isPaging)), [dispatch]);

  const onActionToCreate = useCallback(() => navigation.navigate('CreateNote'), [navigation]);

  const onPress = useCallback(id => navigation.navigate('DetailNote', { id }), [navigation]);

  const onPressBack = useCallback(() => {
    return handleConfirm('정말', '로그아웃할거에요?', () => {
      deleteAccessToken();
      return navigation.goBack();
    });
  }, [navigation]);

  const onNext = useCallback(() => {
    getList(true);
  }, [getList]);

  const onPressHardware = useCallback(() => {
    if (isFocused) {
      if (!isBackPress) {
        isBackPress = true;
        Toast.showWithGravity('다시 한번 요청 시 로그아웃 할 수 있습니다', Toast.SHORT, Toast.CENTER);
      } else {
        onPressBack();
      }
      setTimeout(() => {
        isBackPress = false;
      }, 1000);
      return true;
    }
    return false;
  }, [isFocused, onPressBack]);

  useEffect(() => {
    if (params?.update) {
      getList(false);
      navigation.setParams({ update: false });
    }
  }, [navigation, params, getList]);

  useEffect(() => {
    admob()
      .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.G,
        tagForChildDirectedTreatment: false,
        tagForUnderAgeOfConsent: false,
      })
      .then(() => {
        setIsShowBanner(true);
      })
      .catch(() => {
        Alert.alert("admob error configuration");
      });

    BackHandler.addEventListener('hardwareBackPress', onPressHardware);
    getList(false);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPressHardware);
    };
  }, [getList, onPressHardware]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter
        list={list}
        graph={graph}
        onActionToCreate={onActionToCreate}
        onPress={onPress}
        onPressBack={onPressBack}
        onNext={onNext}
      />
      {isShowBanner && (
        <BannerAd
          unitId={Platform.OS === 'ios' ? Config.ADMOB_UNIT_ID_IOS : Config.ADMOB_UNIT_ID_AOS}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdFailedToLoad={(error) => {
            Alert.alert(`${error}`);
            setIsShowBanner(false);
          }}
        />
      )}
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};

export default Container;
