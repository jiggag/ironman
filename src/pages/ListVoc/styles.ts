import { Text, StyleSheet } from 'react-native';
import styled from 'styled-components';
import Constant from '@utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  emptyCard: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  safeAreaView: {
    backgroundColor: Constant.WHITE_COLOR,
    flex: 1,
  },
});

export const Title = styled(Text)`
  color: #000000;
  margin-bottom: 5px;
  font-size: 16px;
`;
export const Content = styled(Text)`
  color: #000000;
  font-size: 12px;
`;

export default styles;
