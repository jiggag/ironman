import { StyleSheet } from 'react-native';
import Constant from '@utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContent: {
    display: 'flex',
    flex: 1,
    minHeight: 240,
  },
  inputLine: {
    backgroundColor: Constant.WHITE_COLOR,
    borderRadius: 2,
    elevation: 5,
    paddingHorizontal: 10,
    shadowColor: Constant.SHADOW_COLOR,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputTitle: {
    display: 'flex',
    flex: 1,
    minHeight: 40,
  },
  safeAreaView: {
    backgroundColor: Constant.WHITE_COLOR,
    flex: 1,
  },
});

export default styles;
