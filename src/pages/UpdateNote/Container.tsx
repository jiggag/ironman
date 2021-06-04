import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useDynamicValue } from 'react-native-dynamic';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import _noop from 'lodash/noop';
import { updateNoteRequest } from '@reducers/note';
import { handleAlert } from '@utils/index';
import { RootReducer } from '../../types';
import Presenter from './Presenter';
import { dynamicStyles } from './styles';

const Container = ({ route: { params } }) => {
  const styles = useDynamicValue(dynamicStyles);
  const navigation = useNavigation();
  const [note, setNote] = useState(params.originNote);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store: RootReducer) => store.note);
  const updateNote = useCallback((param) => dispatch(updateNoteRequest(param)), [dispatch]);

  const onPress = useCallback(async () => {
    updateNote({
      note: {
        ...note,
        food: JSON.stringify(note.food),
        done: JSON.stringify(note.done),
        date: moment(note.date).valueOf(),
        image: '',
      },
      cbSuccess: () => navigation.navigate('DetailNote', { update: true, id: note.id }),
      cbFailure: (message) => handleAlert('노트 수정 실패', message, _noop),
    });
  }, [updateNote, navigation, note]);

  const onChangeNote = useCallback((value) => {
    setNote((prev) => ({ ...prev, ...value }));
  }, []);

  const onPressBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter
        scrollEnabled={scrollEnabled}
        setScrollEnabled={setScrollEnabled}
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
