import { StyleSheet } from 'react-native';
import Constant from '../../utils/constants';

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Constant.WHITE_COLOR,
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  inputLine: {
    borderRadius: 6,
    backgroundColor: Constant.WHITE_COLOR,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: Constant.SHADOW_COLOR,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputTitle: {
    minHeight: 40,
    display: 'flex',
    flex: 1,
  },
  inputContent: {
    minHeight: 240,
    display: 'flex',
    flex: 1,
  }
});

export default styles;
