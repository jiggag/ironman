import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import _noop from 'lodash/noop';
import { createNoteRequest } from '@reducers/note';
import { handleAlert } from '@utils/index';
import { NoteData, RootReducer } from '../../types';
import Presenter from './Presenter';
import styles from './styles';

const Container = () => {
  const navigation = useNavigation();
  /*
    Weather 날씨: radio [너무 더움, 조금 더움, 살만함, 조금 추움, 너무 추움]
    Food 식단: text
    Done 한일: text
    Etc 기타: text
    State 상태: radio [완전 좋음, 조금 좋음, 그럭저럭, 조금 심함, 너무 심함]
  */
  const [note, setNote] = useState<NoteData>({
    id: -1,
    title: '',
    date: moment().valueOf(),
    weather: 3,
    food: {},
    done: {},
    etc: '',
    state: 1,
  });
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store: RootReducer) => store.note);
  const createNote = useCallback((param) => dispatch(createNoteRequest(param)), [dispatch]);

  const onPress = useCallback(() => {
    if (!note.title) {
      return handleAlert('', '제목을 입력해주세요', _noop);
    }
    createNote({
      note: {
        ...note,
        food: JSON.stringify(note.food),
        done: JSON.stringify(note.done),
        date: moment(note.date).startOf('days').valueOf(),
        image: '',
      },
      cbSuccess: () => navigation.navigate('ListNote', { update: true }),
      cbFailure: (message) => handleAlert('노트 생성 실패', message, _noop),
    });
  }, [createNote, navigation, note]);

  const onChangeNote = useCallback((value: Record<string, string | number | Record<number, string>>) => {
    setNote((prev) => ({ ...prev, ...value }));
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
