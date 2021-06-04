import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Constant, { FontWeight, FontSize, Color } from '@utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateText: {
    color: Constant.BLACK,
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
    backgroundColor: Constant.WHITE_COLOR,
    borderRadius: 2,
    elevation: 5,
    shadowColor: Constant.SHADOW_COLOR,
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
    backgroundColor: Constant.WHITE_COLOR,
    flex: 1,
  },
  titleText: {
    color: Constant.BLACK,
    fontSize: FontSize.normal,
    fontWeight: FontWeight.normal,
    marginTop: 2,
  },
});

export const State = styled.View`
  border-radius: 30px;
  background: ${Color.black};
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
export const Weather = styled.View`
  border-radius: 30px;
  border-width: 1px;
  padding: 2px 6px;
  align-self: center;
  margin-right: 6px;
  border-color: ${Color.black};
`;
export const WeatherText = styled.Text`
  font-size: ${FontSize.small}px;
  color: ${Color.black};
`;

export default styles;
