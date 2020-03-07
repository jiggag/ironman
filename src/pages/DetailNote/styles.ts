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
  inputBox: {
    borderRadius: 6,
    backgroundColor: Constant.WHITE_COLOR,
    padding: 10,
    elevation: 5,
    shadowColor: Constant.SHADOW_COLOR,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputRow: {
    borderRadius: 6,
    backgroundColor: Constant.WHITE_COLOR,
    padding: 10,
    marginVertical: 3,
    elevation: 5,
    shadowColor: Constant.SHADOW_COLOR,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  input: {
    minHeight: 40,
    display: 'flex',
    flex: 1,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
    height: 40,
  },
});

export default styles;
