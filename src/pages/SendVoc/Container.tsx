import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Presenter from './Presenter';
import styles from './styles';
import { sendVocRequest } from '../../reducers/voc';

const Container = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(store => store.voc);
  const [state, setState] = useState({
    title: '',
    content: ''
  });

  const onPressBack = useCallback(() => navigation.goBack(), [navigation]);
  const onPress = () => dispatch(sendVocRequest({ data: state, cb: navigation.goBack }));

  const onChangeText = (value: {
    title?: string,
    content?: string,
  }) => {
    setState({ ...state, ...value });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter state={state} onChangeText={onChangeText} onPress={onPress} onPressBack={onPressBack} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};

export default Container;
