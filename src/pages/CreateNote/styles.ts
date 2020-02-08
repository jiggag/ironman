import { StyleSheet } from 'react-native';
import Constant from '../../utils/constants';

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Constant.WHITE_COLOR,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  cameraView: {
    height: 300,
    width: 300,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Constant.HIGHLIGHT_SUB_COLOR,
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
  inputRow: {
    borderRadius: 3,
    backgroundColor: Constant.WHITE_COLOR,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Constant.HIGHLIGHT_SUB_COLOR,
    padding: 10,
    marginVertical: 2,
  },
  input: {
    minHeight: 30,
    display: 'flex',
    flex: 1,
  },
  buttonView: {
  },
  dateIcon: {
    display: 'none'
  },
  dateInput: {
    position: 'absolute',
    borderWidth: 0,
    borderBottomWidth: 1,
    height: 20,
    left: 0
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600'
  },
});

export default styles;
