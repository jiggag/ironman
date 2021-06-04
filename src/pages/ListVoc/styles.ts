import { Text, StyleSheet } from 'react-native';
import styled from 'styled-components';
import Constant, { Color, FontSize } from '@utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  safeAreaView: {
    backgroundColor: Constant.WHITE_COLOR,
    flex: 1,
  },
});

export const Title = styled(Text)`
  color: ${Color.black};
  margin-bottom: 5px;
  font-size: ${FontSize.button}px;
`;
export const Content = styled(Text)`
  color: ${Color.black};
  font-size: ${FontSize.normal}px;
`;

export default styles;
