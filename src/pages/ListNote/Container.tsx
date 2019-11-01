import React, { useState, useCallback, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native';
import moment from 'moment';
import styles from './styles';
import Presenter from './Presenter';
import { Actions } from 'react-native-router-flux';
import { handleAlert, RESTful } from '../../utils';

const Container = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const init = async () => {
    await setIsLoading(true);
    try {
      const { return_code, return_data } = await RESTful('GET', '/list');
      if (return_code === 200) {
        setList(return_data);
      }
      console.log('%c%s', 'background: #00ff00; color: #ffffff', return_data);
    } catch (error) {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[GET] (/list)', '\n', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const onActionToCreate = () => Actions.createNote();
  const onPress = id => handleAlert(id, `${id}노트상세보기`, () => Actions.detailNote({ id }));
  const onPressBack = () => Actions.pop();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter list={list} onActionToCreate={onActionToCreate} onPress={onPress} onPressBack={onPressBack} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
}
export default Container;