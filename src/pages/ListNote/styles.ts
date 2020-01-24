import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
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
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export const StateText = styled.Text<{ state: number }>`
  font-size: 12px;
  color: ${({ state }) => {
    if (state === 5) {
      return '#ff0000';
    } else if (state === 4) {
      return '#fd9f0b';
    } else if (state === 3) {
      return '#fdf80b';
    } else if (state === 2) {
      return '#65fd0b';  
    }
    return '#0bd9fd';
  }}
`;

export default styles;
