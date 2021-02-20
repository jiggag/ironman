import { StyleSheet } from 'react-native';
import Constant from '../../utils/constants';

const styles = StyleSheet.create({
  buttonView: {},
  cameraView: {
    alignSelf: 'center',
    borderColor: Constant.HIGHLIGHT_SUB_COLOR,
    borderWidth: 1,
    height: 300,
    width: 300,
  },
  container: {
    flex: 1,
  },
  dateIcon: {
    display: 'none',
  },
  dateInput: {
    borderBottomWidth: 1,
    borderWidth: 0,
    height: 20,
    left: 0,
    position: 'absolute',
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
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
