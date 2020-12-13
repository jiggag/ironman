import React, { useEffect, useCallback } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import Presenter from './Presenter';
import { handleConfirm } from '../../utils';
import { deleteAccessToken } from '../../utils/auth';
import { getListRequest } from '../../reducers/note';
import styles from './styles';

let isBackPress = false;
const Container = ({ route: { params } }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { list, graph, isLoading } = useSelector(store => store.note);
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
    if (!isFocused) {
      return;
    }
    BackHandler.addEventListener('hardwareBackPress', onPressHardware);
    getList(false);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPressHardware);
    };
  }, [getList, isFocused, onPressHardware]);

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
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};

export default Container;
