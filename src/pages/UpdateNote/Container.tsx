import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { handleAlert } from '../../utils';
import Presenter from './Presenter';
import styles from './styles';
import { updateNoteRequest } from '../../reducers/note';

const Container = ({ navigation }) => {
  const [note, setNote] = useState(navigation.state.params.originNote);
  const [image] = useState(null);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(store => store.note);
  const updateNote = useCallback(param => dispatch(updateNoteRequest(param)), [dispatch]);

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

export default Container;

Container.defaultProps = {
  navigation: {},
};
Container.propTypes = {
  navigation: PropTypes.any,
};
