import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import { handleAlert, RESTful } from '../../utils';
import Presenter from './Presenter';
import styles from './styles';

const Container = ({ originNote }) => {
  const [note, setNote] = useState(originNote);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPress = async () => {
    await setIsLoading(true);
    try {
      const { return_code, return_message } = await RESTful('PUT', `/note`, { ...note, image: !!image && image.name });
      console.log('%c%s', 'background: #00ff00; color: #ffffff', { return_code, return_message });
      if (return_code === 200) {
        return Actions.listNote({ type: ActionConst.REPLACE, update: true });
      }
      return handleAlert("노트 수정 실패", return_message, () => null);
    } catch (error) {
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[PUT] (/note)', '\n', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeNote = value => {
    setNote({ ...note, ...value });
  };

  const onPressBack = () => Actions.pop();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter
        note={note}
        onPress={onPress}
        onChangeNote={onChangeNote}
        onPressBack={onPressBack}
      />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );

};
export default Container;
