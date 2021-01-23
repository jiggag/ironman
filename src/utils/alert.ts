import { Alert } from 'react-native';

const handleAlert = (title: string, message: string, onPress: () => void) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: '확인',
        onPress,
      },
    ],
    { cancelable: false },
  );
};
const handleConfirm = (title: string, message: string, onPress: () => void, onPressCancel?: () => void) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: '확인',
        onPress,
      },
      {
        text: '취소',
        onPress: onPressCancel || (() => null),
      },
    ],
    { cancelable: false },
  );
};

export { handleAlert, handleConfirm };
