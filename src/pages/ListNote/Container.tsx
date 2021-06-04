import React, { useRef, useEffect, useCallback } from 'react';
import { BackHandler, StatusBar } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useDynamicValue } from 'react-native-dynamic';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getListRequest } from '@reducers/note';
import { deleteAccessToken } from '@utils/auth';
import { Theme } from '@utils/constants';
import { handleConfirm } from '@utils/index';
import { RootReducer } from '../../types';
import Presenter from './Presenter';
import { dynamicStyles } from './styles';

interface ListNoteProps {
  setShowBanner: (isShow: boolean) => void;
  route: {
    params?: {
      update?: boolean;
    };
  };
}

const Container = ({ route: { params }, setShowBanner }: ListNoteProps) => {
  const styles = useDynamicValue(dynamicStyles);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { list, graph, isLoading } = useSelector((store: RootReducer) => store.note);
  const getList = useCallback((isPaging) => dispatch(getListRequest(isPaging)), [dispatch]);
  const isBackPress = useRef<boolean>(false);

  const onActionToCreate = useCallback(() => navigation.navigate('CreateNote'), [navigation]);

  const onPress = useCallback((id) => navigation.navigate('DetailNote', { id }), [navigation]);

  const onPressBack = useCallback(() => {
    return handleConfirm('정말', '로그아웃할거에요?', () => {
      deleteAccessToken();
      setShowBanner(false);
      return navigation.goBack();
    });
  }, [navigation, setShowBanner]);

  const onNext = useCallback(() => {
    getList(true);
  }, [getList]);

  const onPressHardware = useCallback(() => {
    if (isFocused) {
      if (!isBackPress.current) {
        isBackPress.current = true;
        Toast.showWithGravity('다시 한번 요청 시 로그아웃 할 수 있습니다', Toast.SHORT, Toast.CENTER);
      } else {
        onPressBack();
      }
      setTimeout(() => {
        isBackPress.current = false;
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
      <StatusBar
        backgroundColor={useDynamicValue(Theme.light.background, Theme.dark.background)}
        barStyle={useDynamicValue('dark-content', 'light-content')}
      />
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
