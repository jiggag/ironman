import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
// import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { handleAlert } from '../../utils';
import Presenter from './Presenter';
import styles from './styles';
import { createNoteRequest } from '../../reducers/note';
import { NoteData } from '../../types';

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
  const [image] = useState(null);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(store => store.note);
  const createNote = useCallback(param => dispatch(createNoteRequest(param)), [dispatch]);

  const onPress = useCallback(() => {
    if (!note.title) {
      return handleAlert('', '제목을 입력해주세요', () => {});
    }
    createNote({
      note: {
        ...note,
        food: JSON.stringify(note.food),
        done: JSON.stringify(note.done),
        date: moment(note.date)
          .startOf('days')
          .valueOf(),
        image: !!image && image.name,
      },
      cbSuccess: () => navigation.navigate('ListNote', { update: true }),
      cbFailure: message => handleAlert('노트 생성 실패', message, () => {}),
    });
  }, [createNote, image, navigation, note]);

  const onChangeNote = useCallback((value: Record<string, string | number | Record<number, string>>) => {
    setNote((prev) => ({ ...prev, ...value }));
  }, []);

  // const onPressImage = () => {
  // const options = {
  //   quality: 0.95,
  //   maxWidth: 1000,
  //   maxHeight: 1000,
  //   title: '',
  //   cancelButtonTitle: '취소',
  //   takePhotoButtonTitle: '사진찍기',
  //   chooseFromLibraryButtonTitle: '사진선택',
  // };

  // ImagePicker.showImagePicker(options, response => {
  //   if (response.didCancel) {
  //     handleAlert('사진', 'User cancelled photo picker', () => {});
  //   } else if (response.error) {
  //     handleAlert('사진', `ImagePicker Error: ${response.error}`, () => {});
  //   } else if (response.customButton) {
  //     handleAlert('사진', `User tapped custom button: ${response.customButton}`, () => {});
  //   } else {
  //     const imageObject = {
  //       uri: response.uri,
  //       name: response.fileName ? response.fileName : 'filename',
  //       type: null,
  //     };
  //     if (Platform.OS === 'android') {
  //       imageObject.type = response.type;
  //     }
  //     handleAlert('사진', `성공: ${imageObject.uri}/ ${imageObject.name} /${imageObject.type}`, () => {});
  //
  //     // multipart formdata => 서버에 저장된 이미지 경로를 가져와서 그려줘야하는듯
  //     setImage(imageObject);
  //   }
  // });
  // };

  const onPressBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter
        note={note}
        // image={image}
        onPress={onPress}
        onChangeNote={onChangeNote}
        // onPressImage={onPressImage}
        onPressBack={onPressBack}
      />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};

export default Container;
