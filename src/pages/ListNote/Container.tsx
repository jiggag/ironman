import React, { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native';
import styles from './styles';
import Presenter from './Presenter';
import { Actions } from 'react-native-router-flux';
import { handleAlert, RESTful } from '../../utils';

const Container = ({ update = false }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const format = list => {
    const newList = [];
    for (const data of list) {
      newList.push({ id: newList.length + 1, ...data });
    }
    return newList;
  };

  const init = async () => {
    await setIsLoading(true);
    try {
      const { return_code, return_data } = await RESTful('GET', '/list');
      if (return_code === 200) {
        setList(format(return_data));
      }
      console.log('%c%s', 'background: #00ff00; color: #ffffff', return_data);
    } catch (error) {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[GET] (/list)', '\n', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (update) {
      init();
    }
  }, [update]);

  useEffect(() => {
    init();
  }, []);

  const onActionToCreate = () => Actions.createNote();
  const onPress = id => handleAlert(`id= ${id}`, `${id}노트상세보기`, () => {});
  const onPressBack = () => Actions.pop();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter list={list} onActionToCreate={onActionToCreate} onPress={onPress} onPressBack={onPressBack} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};
export default Container;
