import React, { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native';
import styles from './styles';
import Presenter from './Presenter';
import { RESTful } from '../../utils';

const Container = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [graph, setGraph] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const format = list => {
    const newList = [];
    const newGraph = [];
    for (const data of list) {
      newList.push({ id: newList.length + 1, ...data });
      newGraph.push(6 - data.state);
    }
    return { list: newList, graph: newGraph.reverse() };
  };

  const init = async () => {
    await setIsLoading(true);
    try {
      const { return_code, return_data } = await RESTful('GET', '/list');
      if (return_code === 200) {
        const { list, graph } = await format(return_data);
        await setList(list);
        await setGraph(graph);
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

  const onActionToCreate = () => navigation.navigate('CreateNote');
  const onPress = id => navigation.navigate('DetailNote', { id });
  const onPressBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter isLoading={isLoading} list={list} graph={graph} onActionToCreate={onActionToCreate} onPress={onPress} onPressBack={onPressBack} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};
export default Container;
