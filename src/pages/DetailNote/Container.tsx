import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import _find from 'lodash/find';
import { handleConfirm } from '../../utils';
import Presenter from './Presenter';
import styles from './styles';
import { getNoteRequest, deleteNoteRequest } from '../../reducers/note';

const Container = ({ navigation, note, isLoading, getNote, deleteNote }) => {
  const [id] = useState(navigation.state.params.id);

  const onPressDelete = useCallback(() => {
    return handleConfirm('정말', '삭제하시겠습니까', () => {
      deleteNote({ id, callback: () => navigation.navigate('ListNote', { update: true }) });
    });
  }, []);

  const onPressUpdate = () => navigation.navigate('UpdateNote', { originNote: { ...note, id } });

  const onPressBack = useCallback(() => navigation.navigate('ListNote'), []);

  useEffect(() => {
    const { params: { update = false } = {} } = navigation.state;
    if (update) {
      getNote(id);
      navigation.setParams({ update: false });
    }
  }, [navigation.state.params]);

  useEffect(() => {
    getNote(id);
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter note={note} onPressDelete={onPressDelete} onPressUpdate={onPressUpdate} onPressBack={onPressBack} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = ({ note }) => ({
  ...note,
});

const mapDispatchToProps = {
  getNote: getNoteRequest,
  deleteNote: deleteNoteRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
