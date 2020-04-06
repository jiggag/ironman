import React, { useEffect, useCallback } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import Presenter from './Presenter';
import { handleConfirm } from '../../utils';
import { deleteAccessToken } from '../../utils/auth';
import { getListRequest } from '../../reducers/note';

let isBackPress = false;

const COLOR = [
  'green',
  'yellow',
  'orange',
  'pink',
  'red',
];
const Container = ({ navigation }) => {
  const dispatch = useDispatch();
  const { list, graph, isLoading } = useSelector(store => store.note);

  const getList = useCallback(isPaging => dispatch(getListRequest(isPaging)), [dispatch]);

  const onActionToCreate = useCallback(() => navigation.navigate('CreateNote'), [navigation]);

  const onPress = useCallback(id => navigation.navigate('DetailNote', { id }), [navigation]);

  const onPressBack = useCallback(() => {
    return handleConfirm('정말', '로그아웃할거에요?', () => {
      deleteAccessToken();
      return navigation.goBack();
    });
  }, [navigation]);

  const onNext = useCallback(() => {
    getList(true);
  }, [getList]);

  const onPressHardware = useCallback(() => {
    if (navigation.isFocused()) {
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
    }
    return false;
  }, [navigation, onPressBack]);

  const getPieData = useCallback(data => {
    let percent = [0, 0, 0, 0, 0];
    data.forEach(v => {
      percent[v - 1] += 1;
    });
    return percent.map((value, index) => ({
      value,
      svg: {
        fill: COLOR[index],
      },
      key: `pie-${index}`,
    }));
  }, []);

  useEffect(() => {
    const { params: { update = false } = {} } = navigation.state;
    if (update) {
      getList(false);
      navigation.setParams({ update: false });
    }
  }, [navigation.state.params, navigation, getList]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onPressHardware);
    getList(false);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPressHardware);
    };
  }, [getList, onPressHardware]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter
        getPieData={getPieData}
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

Container.defaultProps = {
  navigation: {},
};
Container.propTypes = {
  navigation: PropTypes.any,
};
