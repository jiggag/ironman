import { Text } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import styled from 'styled-components';
import { FontSize, Theme } from '@utils/constants';

export const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  safeAreaView: {
    backgroundColor: new DynamicValue(Theme.light.background, Theme.dark.background),
    flex: 1,
  },
});

export const Title = styled(Text)<{ color: string }>`
  color: ${({ color }) => color};
  margin-bottom: 5px;
  font-size: ${FontSize.button}px;
`;
export const Content = styled(Text)<{ color: string }>`
  color: ${({ color }) => color};
  font-size: ${FontSize.normal}px;
`;
