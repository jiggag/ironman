import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Presenter from './Presenter';
import styles from './styles';

const Container = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    title: '',
    content: ''
  });

  const onPressBack = useCallback(() => navigation.goBack(), [navigation]);

  const onPress = () => {
    // TODO send
  };

  const onChangeText = (value: {
    title?: string,
    content?: string,
  }) => {
    setState({ ...state, ...value });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter state={state} onChangeText={onChangeText} onPress={onPress} onPressBack={onPressBack} />
    </SafeAreaView>
  );
};

export default Container;
