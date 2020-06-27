import { StyleSheet } from 'react-native';
import styled from 'styled-components';
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
  emptyCard: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export const Title = styled.Text`
  margin-bottom: 5px;
  font-size: 16px;
`;
export const Content = styled.Text`
  font-size: 12px;
`;

export default styles;
