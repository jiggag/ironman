import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
// import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import { handleAlert, RESTful } from '../../utils';
import Presenter from './Presenter';
import styles from './styles';

const Container = () => {
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
    weather: 4,
    food: null,
    done: null,
    etc: null,
    state: 1,
  });
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPress = async () => {
    if (!note.title) {
      return handleAlert('', '제목을 입력해주세요', () => {});
    }
    await setIsLoading(true);
    try {
      // TODO: image multipart upload
      const { return_code, return_message } = await RESTful('POST', '/note', { ...note, date: moment(note.date).format('YYYY.MM.DD'), image: !!image && image.name });
      console.log('%c%s', 'background: #00ff00; color: #ffffff', return_code, return_message);
      if (return_code === 200) {
        setIsLoading(false);
        return Actions.listNote({ type: ActionConst.REPLACE, update: true });
      }
      return handleAlert("노트 생성 실패", return_message, () => {
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      console.error('%c%s', 'background: #00ff00; color: #ffffff', '[POST] (/note)', '\n', error);
    }
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

  const onPressBack = () => Actions.pop();

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
export default Container;
