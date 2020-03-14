import React, { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView, Alert } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import Presenter from './Presenter';
import { handleConfirm } from '../../utils';
import { deleteAccessToken } from '../../utils/auth';
import { getListRequest } from '../../reducers/note';

const Container = ({ navigation, list, graph, isLoading, getList }) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    const { params: { update = false } = {} } = navigation.state;
    if (update) {
      getList(1);
      navigation.setParams({ update: false });
    }
  }, [navigation.state.params]);

  useEffect(() => {
    getList(1);
  }, []);

  const onActionToCreate = () => navigation.navigate('CreateNote');
  const onPress = id => navigation.navigate('DetailNote', { id });
  const onPressBack = () => {
    return handleConfirm('정말', '로그아웃할거에요?', () => {
      deleteAccessToken();
      return navigation.goBack();
    });
  };
  const onNext = () => {
    console.log('onNext', page);
    // init(page + 1);
  };

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

const mapStateToProps = ({ note }) => ({
  ...note,
});

const mapDispatchToProps = {
  getList: getListRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
