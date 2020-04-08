import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { handleAlert } from '../../utils';
import Presenter from './Presenter';
import styles from './styles';
import { updateNoteRequest } from '../../reducers/note';

const Container = ({ route: { params }}) => {
  const navigation = useNavigation();
  const [note, setNote] = useState(params.originNote);
  const [image] = useState(null);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(store => store.note);
  const updateNote = useCallback(param => dispatch(updateNoteRequest(param)), [dispatch]);

  const onPress = useCallback(async () => {
    updateNote({
      note: {
        ...note,
        food: JSON.stringify(note.food),
        done: JSON.stringify(note.done),
        date: moment(note.date).valueOf(),
        image: !!image && image.name,
      },
      cbSuccess: () => navigation.navigate('DetailNote', { update: true, id: note.id }),
      cbFailure: message => handleAlert('노트 수정 실패', message, () => {}),
    });
  }, [updateNote, navigation, note]);

  const onChangeNote = useCallback(value => {
    setNote({ ...note, ...value });
  }, []);

  const onPressBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter note={note} onPress={onPress} onChangeNote={onChangeNote} onPressBack={onPressBack} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};

export default Container;
