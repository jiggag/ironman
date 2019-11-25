import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import _find from 'lodash/find';
import { RESTful } from '../../utils';
import Presenter from './Presenter';
import styles from './styles';
import { stateList, weatherList } from '../../utils/common';
import {ActionConst, Actions} from 'react-native-router-flux';

const Container = ({ id }) => {
  const [note, setNote] = useState({
    title: null,
    date: null,
    weather: 0,
    food: null,
    done: null,
    etc: null,
    state: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onPressDelete = async () => {
    await setIsLoading(true);
    try {
      const { return_code } = await RESTful('POST', `/deleteNote`, { id });
      if (return_code === 200) {
        return Actions.listNote({ type: ActionConst.PUSH_OR_POP, update: true });
      }
    } catch (error) {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/note)', '\n', error);
    } finally {
      setIsLoading(false);
    }
  };
  const onPressUpdate = () => Actions.updateNote({ originNote: { ...note, id } });

  const onPressBack = () => {
    Actions.pop();
  };

  const init = async () => {
    await setIsLoading(true);
    try {
      const { return_code, return_message, return_data } = await RESTful('GET', `/note?id=${id}`);
      const { value: state } = _find(stateList, {'id': return_data.state});
      const { value: weather } = _find(weatherList, {'id': return_data.weather});
      setNote({ ...return_data, state, weather });
      console.log('%c%s', 'background: #00ff00; color: #ffffff', return_data);
    } catch (error) {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (detail note)', '\n', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter
        note={note}
        onPressDelete={onPressDelete}
        onPressUpdate={onPressUpdate}
        onPressBack={onPressBack}
      />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );

};
export default Container;
