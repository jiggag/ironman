import React, { useState, useEffect, useCallback } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView, BackHandler, Alert } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import _debounce from 'lodash/debounce';
import styles from './styles';
import Presenter from './Presenter';
import { handleConfirm } from '../../utils';
import { deleteAccessToken } from '../../utils/auth';
import { getListRequest } from '../../reducers/note';

let isBackPress = false;
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
    BackHandler.addEventListener('hardwareBackPress', onPressHardware);
    getList(1);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPressHardware);
    };
  }, []);

  const onPressHardware = useCallback(() => {
    if (!isBackPress) {
      isBackPress = true;
      Toast.showWithGravity('다시 한번 요청 시 로그아웃 할 수 있습니다', Toast.SHORT, Toast.CENTER);
    } else {
      onPressBack();
    }
    setTimeout(() => {
      isBackPress = false;
    }, 1000);
    return true;
  }, []);

  const onActionToCreate = () => navigation.navigate('CreateNote');
  const onPress = id => navigation.navigate('DetailNote', { id });
  const onPressBack = () => {
    isBackPress = false;
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
