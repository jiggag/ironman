import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import styled from 'styled-components/native';
import { FontWeight, FontSize, Theme } from '@utils/constants';

export const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
  },
  dateText: {
    color: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    flex: 1,
    fontSize: FontSize.small,
    marginBottom: 4,
  },
  emptyCard: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  itemComponent: {
    backgroundColor: new DynamicValue(Theme.light.background, Theme.dark.background),
    borderRadius: 2,
    elevation: 5,
    shadowColor: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  noteCard: {
    borderRadius: 2,
  },
  safeAreaView: {
    backgroundColor: new DynamicValue(Theme.light.background, Theme.dark.background),
    flex: 1,
  },
  titleText: {
    color: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    fontSize: FontSize.normal,
    fontWeight: FontWeight.normal,
    marginTop: 2,
  },
});

export const State = styled.View<{ color: string; borderColor: string }>`
  border-radius: 30px;
  background: ${({ color }) => color};
  border-color: ${({ borderColor }) => borderColor};
  border-width: 1px;
  width: 18px;
  height: 18px;
  justify-content: center;
  align-self: center;
  align-items: center;
`;
export const StateText = styled.Text<{ state: number }>`
  font-size: ${FontSize.small}px;
  font-weight: ${FontWeight.bold};
  color: ${({ state }) => {
    if (state === 5) {
      return '#ff0000';
    }
    if (state === 4) {
      return '#fd9f0b';
    }
    if (state === 3) {
      return '#fdf80b';
    }
    if (state === 2) {
      return '#65fd0b';
    }
    return '#0bd9fd';
  }};
`;
export const Weather = styled.View<{ color: string }>`
  border-radius: 30px;
  border-width: 1px;
  padding: 2px 6px;
  align-self: center;
  margin-right: 6px;
  border-color: ${({ color }) => color};
`;
export const WeatherText = styled.Text<{ color: string }>`
  font-size: ${FontSize.small}px;
  color: ${({ color }) => color};
`;
