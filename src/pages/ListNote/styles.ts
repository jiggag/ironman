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
  emptyCard: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noteCard: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Constant.HIGHLIGHT_SUB_COLOR,
    borderRadius: 3,
  },
  dateText: {
    fontSize: 12,
    marginBottom: 4,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
  }
});

export default styles;
