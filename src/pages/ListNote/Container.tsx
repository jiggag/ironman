import React, { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native';
import styles from './styles';
import Presenter from './Presenter';
import { RESTful } from '../../utils';

const Container = ({ navigation }) => {
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
        await setList(format(return_data));
      }
    } catch (error) {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[GET] (/list)', '\n', error);
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

  const onActionToCreate = () => navigation.navigate('createNote');
  const onPress = id => navigation.navigate('detailNote', { id });
  const onPressBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter isLoading={isLoading} list={list} onActionToCreate={onActionToCreate} onPress={onPress} onPressBack={onPressBack} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};
export default Container;
