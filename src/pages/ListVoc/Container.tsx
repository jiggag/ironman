import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Presenter from './Presenter';
import styles from './styles';
import { getVocRequest } from '../../reducers/voc';

const Container = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { list, isLoading } = useSelector(store => store.voc);
  const onPressBack = useCallback(() => navigation.goBack(), [navigation]);

  useEffect(() => {
    dispatch(getVocRequest());
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter list={list} onPressBack={onPressBack} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};

export default Container;
