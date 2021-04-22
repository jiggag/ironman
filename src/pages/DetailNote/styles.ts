import { StyleSheet } from 'react-native';
import Constant from '@utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateText: {
    color: Constant.BLACK,
    fontSize: 18,
    fontWeight: '600',
    height: 40,
    textDecorationLine: 'underline',
  },
  input: {
    display: 'flex',
    flex: 1,
    minHeight: 40,
  },
  inputBox: {
    backgroundColor: Constant.WHITE_COLOR,
    borderRadius: 2,
    elevation: 5,
    padding: 10,
    shadowColor: Constant.SHADOW_COLOR,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
  inputRow: {
    backgroundColor: Constant.WHITE_COLOR,
    borderRadius: 2,
    elevation: 5,
    marginVertical: 5,
    padding: 10,
    shadowColor: Constant.SHADOW_COLOR,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  safeAreaView: {
    backgroundColor: Constant.WHITE_COLOR,
    flex: 1,
  },
});

export default styles;
