import { Alert } from 'react-native';

const handleAlert = (title: string, message: string, onPress: any) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: '확인',
        onPress
      },
    ],
    { cancelable: false }
  );
}

export { handleAlert };