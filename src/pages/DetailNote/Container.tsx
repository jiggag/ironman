import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { handleConfirm } from '../../utils';
import Presenter from './Presenter';
import styles from './styles';
import { getNoteRequest, deleteNoteRequest } from '../../reducers/note';

const Container = ({ route: { params } }) => {
  const navigation = useNavigation();
  const [id] = useState(params.id);
  const dispatch = useDispatch();
  const { note, isLoading } = useSelector(store => store.note);
  const getNote = useCallback(param => dispatch(getNoteRequest(param)), [dispatch]);
  const deleteNote = useCallback(param => dispatch(deleteNoteRequest(param)), [dispatch]);

  const onPressDelete = useCallback(() => {
    return handleConfirm('정말', '삭제하시겠습니까', () => {
      deleteNote({ id, callback: () => navigation.navigate('ListNote', { update: true }) });
    });
  }, [navigation, id, deleteNote]);

  const onPressUpdate = useCallback(() => navigation.navigate('UpdateNote', { originNote: { ...note, id } }), [
    id,
    note,
    navigation,
  ]);

  const onPressBack = useCallback(() => navigation.goBack(), [navigation]);

  useEffect(() => {
    if (params?.update) {
      getNote(params.id);
      navigation.setParams({ update: false });
    }
  }, [navigation, params, getNote]);

  useEffect(() => {
    getNote(id);
  }, [getNote, id]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter note={note} onPressDelete={onPressDelete} onPressUpdate={onPressUpdate} onPressBack={onPressBack} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};

export default Container;
