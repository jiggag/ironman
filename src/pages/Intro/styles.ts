import { StyleSheet } from 'react-native';
import Constant from '../../utils/constants';

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Constant.WHITE_COLOR,
    flex: 1,
  },
  join: {
    alignItems: 'center',
  },
  joinText: {
    fontSize: 14,
    color: Constant.MAIN_COLOR,
    textDecorationLine: 'underline',
  },
});

export default styles;
