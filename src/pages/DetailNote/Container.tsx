import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import _find from 'lodash/find';
import { RESTful } from '../../utils';
import Presenter from './Presenter';
import styles from './styles';
import { stateList, weatherList } from '../../utils/common';

const Container = ({ navigation }) => {
  const id = navigation.state.params.id;
  const [note, setNote] = useState({
    title: null,
    date: null,
    weather: 0,
    food: null,
    done: null,
    etc: null,
    state: 0,
    stateText: '',
    weatherText: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const onPressDelete = async () => {
    await setIsLoading(true);
    try {
      const { return_code } = await RESTful('POST', `/deleteNote`, { id });
      if (return_code === 200) {
        setIsLoading(false);
        return navigation.navigate('ListNote', { update: true });
      }
    } catch (error) {
      setIsLoading(false);
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/note)', '\n', error);
    }
  };
  const onPressUpdate = () => navigation.navigate('UpdateNote', { originNote: { ...note, id } });

  const onPressBack = () => navigation.navigate('ListNote');

  const init = async () => {
    await setIsLoading(true);
    try {
      const { return_data } = await RESTful('GET', `/note?id=${id}`);
      if (return_data.length) {
        const { state, weather, ...rest } = return_data[0];
        const { value: stateText } = _find(stateList, { 'id': state });
        const { value: weatherText } = _find(weatherList, { 'id': weather });
        setNote({ ...rest, state, weather, stateText, weatherText });
      }
    } catch (error) {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (detail note)', '\n', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const { params: { update = false } = {} } = navigation.state;
    if (update) {
      navigation.setParams({ update: false });
      init();
    }
  }, [navigation.state.params]);
  
  useEffect(() => {
    init();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter
        note={note}
        onPressDelete={onPressDelete}
        onPressUpdate={onPressUpdate}
        onPressBack={onPressBack}
      />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );

};
export default Container;
