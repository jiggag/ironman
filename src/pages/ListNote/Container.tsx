import React, { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native';
import styles from './styles';
import Presenter from './Presenter';
import { Actions, ActionConst } from 'react-native-router-flux';
import { RESTful } from '../../utils';

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
    await Actions.refresh({ update: false });
    await setIsLoading(true);
    try {
      const { return_code, return_data } = await RESTful('GET', '/list');
      if (return_code === 200) {
        await setList(format(return_data));
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
  const onPress = id => Actions.detailNote({ id });
  const onPressBack = () => Actions.intro({ type: ActionConst.RESET });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter isLoading={isLoading} list={list} onActionToCreate={onActionToCreate} onPress={onPress} onPressBack={onPressBack} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};
export default Container;
