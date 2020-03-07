import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
// import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import { connect } from 'react-redux';
import { handleAlert, RESTful } from '../../utils';
import Presenter from './Presenter';
import styles from './styles';
import { createNoteRequest, createNoteSuccess } from '../../reducers/note';

const Container = ({ navigation, isLoading, createNote }) => {
  /*
    Weather 날씨: radio [너무 더움, 조금 더움, 살만함, 조금 추움, 너무 추움]
    Food 식단: text
    Done 한일: text
    Etc 기타: text
    State 상태: radio [완전 좋음, 조금 좋음, 그럭저럭, 조금 심함, 너무 심함]
  */
  const [note, setNote] = useState({
    title: null,
    date: moment().valueOf(),
    weather: 3,
    food: null,
    done: null,
    etc: null,
    state: 1,
  });
  const [image, setImage] = useState(null);

  const onPress = () => {
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
  };

  const onChangeNote = value => {
    setNote({ ...note, ...value });
  };

  const onPressImage = () => {
    const options = {
      quality: 0.95,
      maxWidth: 1000,
      maxHeight: 1000,
      title: '',
      cancelButtonTitle: '취소',
      takePhotoButtonTitle: '사진찍기',
      chooseFromLibraryButtonTitle: '사진선택',
    };

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
  };

  const onPressBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Presenter
        note={note}
        image={image}
        onPress={onPress}
        onChangeNote={onChangeNote}
        onPressImage={onPressImage}
        onPressBack={onPressBack}
      />
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = ({ note }) => ({
  ...note,
});

const mapDispatchToProps = {
  createNote: createNoteRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
