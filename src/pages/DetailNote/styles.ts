import { StyleSheet } from 'react-native';
import Constant from '../../utils/constants';

const styles =  StyleSheet.create({
  safeAreaView: {
    backgroundColor: Constant.WHITE_COLOR,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  inputLine: {
    borderRadius: 3,
    backgroundColor: Constant.WHITE_COLOR,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Constant.HIGHLIGHT_SUB_COLOR,
    paddingHorizontal: 10,
  },
  inputBox: {
    borderRadius: 3,
    backgroundColor: Constant.WHITE_COLOR,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Constant.HIGHLIGHT_SUB_COLOR,
    padding: 10,
  },
  input: {
    minHeight: 50,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
    height: 40,
  },
});

export default styles;
