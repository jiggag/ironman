import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import { connect } from 'react-redux';
import { handleAlert } from '../../utils';
import Presenter from './Presenter';
import styles from './styles';
import { updateNoteRequest } from '../../reducers/note';

const Container = ({ navigation, isLoading, updateNote }) => {
  const [note, setNote] = useState(navigation.state.params.originNote);
  const [image, setImage] = useState(null);

  const onPress = async () => {
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
  };

  const onChangeNote = value => {
    setNote({ ...note, ...value });
  };

  const onPressBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter note={note} onPress={onPress} onChangeNote={onChangeNote} onPressBack={onPressBack} />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = ({ note }) => ({
  ...note,
});

const mapDispatchToProps = {
  updateNote: updateNoteRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
