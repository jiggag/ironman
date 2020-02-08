import React, { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native';
import styles from './styles';
import Presenter from './Presenter';
import { RESTful } from '../../utils';
import { deleteAccessToken } from '../../utils/auth';

const Container = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [graph, setGraph] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const format = (list, page) => {
    const newList = page > 1 ? list : [];
    const newGraph = page > 1 ? graph : [];
    for (const data of list) {
      newList.push({ id: newList.length + 1, ...data });
      newGraph.push(6 - data.state);
    }
    return { list: newList, graph: newGraph.reverse() };
  };

  const init = async page => {
    await setIsLoading(true);
    try {
      const { return_code, return_data } = await RESTful('GET', '/list', { page });
      if (return_code === 200) {
        const { list, graph } = await format(return_data, page);
        await setPage(page);
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
      init(1);
      navigation.setParams({ update: false });
    }
  }, [navigation.state.params]);

  useEffect(() => {
    init(1);
  }, []);

  const onActionToCreate = () => navigation.navigate('CreateNote');
  const onPress = id => navigation.navigate('DetailNote', { id });
  const onPressBack = () => {
    deleteAccessToken();
    return navigation.goBack();
  }
  const onNext = () => {
    console.log("onNext", page);
    // init(page + 1);
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter
        isLoading={isLoading}
        list={list}
        graph={graph}
        onActionToCreate={onActionToCreate}
        onPress={onPress}
        onPressBack={onPressBack}
      />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};
export default Container;
