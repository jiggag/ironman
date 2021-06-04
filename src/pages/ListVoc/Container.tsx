import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDynamicValue } from 'react-native-dynamic';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { getVocRequest } from '@reducers/voc';
import { RootReducer } from '../../types';
import Presenter from './Presenter';
import { dynamicStyles } from './styles';

const Container = () => {
  const styles = useDynamicValue(dynamicStyles);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { list, isLoading } = useSelector((store: RootReducer) => store.voc);
  const onPressBack = useCallback(() => navigation.goBack(), [navigation]);

  useEffect(() => {
    dispatch(getVocRequest({}));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter list={list} onPressBack={onPressBack} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};

export default Container;
