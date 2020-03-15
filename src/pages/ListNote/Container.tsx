import React, { useState, useEffect, useCallback } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import Presenter from './Presenter';
import { handleConfirm } from '../../utils';
import { deleteAccessToken } from '../../utils/auth';
import { getListRequest } from '../../reducers/note';

const Container = ({ navigation }) => {
  const dispatch = useDispatch();
  const { list, graph, isLoading } = useSelector(store => store.note);

  const getList = useCallback(isPaging => dispatch(getListRequest(isPaging)), [dispatch]);

  const onActionToCreate = useCallback(() => navigation.navigate('CreateNote'), []);

  const onPress = useCallback(id => navigation.navigate('DetailNote', { id }), []);

  const onPressBack = useCallback(() => {
    return handleConfirm('정말', '로그아웃할거에요?', () => {
      deleteAccessToken();
      return navigation.goBack();
    });
  }, [handleConfirm, deleteAccessToken]);

  const onNext = useCallback(() => {
    getList(true);
  }, [getList]);

  useEffect(() => {
    const { params: { update = false } = {} } = navigation.state;
    if (update) {
      getList(false);
      navigation.setParams({ update: false });
    }
  }, [navigation.state.params]);

  useEffect(() => {
    getList(false);
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter
        list={list}
        graph={graph}
        onActionToCreate={onActionToCreate}
        onPress={onPress}
        onPressBack={onPressBack}
        onNext={onNext}
      />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};

export default Container;
