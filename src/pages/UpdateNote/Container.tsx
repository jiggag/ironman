import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import { handleAlert, RESTful } from '../../utils';
import Presenter from './Presenter';
import styles from './styles';

const Container = ({ navigation }) => {
  const [note, setNote] = useState(navigation.state.params.originNote);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPress = async () => {
    await setIsLoading(true);
    try {
      const { return_code, return_message } = await RESTful('PUT', `/note`, { ...note, date: moment(note.date).format('YYYY.MM.DD'), image: !!image && image.name });
      if (return_code === 200) {
        setIsLoading(false);
        setIsLoading(false);
        return navigation.navigate('DetailNote', { update: true, id: note.id });
      }
      return handleAlert("노트 수정 실패", return_message, () => {
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onChangeNote = value => {
    setNote({ ...note, ...value });
  };

  const onPressBack = () => navigation.goBack();

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
