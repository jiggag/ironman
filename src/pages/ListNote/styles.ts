import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Constant from '@utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateText: {
    flex: 1,
    fontSize: 12,
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
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});

export const Food = styled.View`
  border-radius: 30px;
  background: #fff;
  border: 1px solid #666;
  padding: 2px 4px;
  align-self: center;
  margin: 0 2px;
`;
export const Category = styled.Text`
  font-size: 12px;
  color: #666;
`;
export const State = styled.View`
  border-radius: 30px;
  background: #333;
  padding: 2px 6px;
  align-self: center;
`;
export const StateText = styled.Text<{ state: number }>`
  font-size: 12px;
  font-weight: 600;
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
`;
export const WeatherText = styled.Text`
  font-size: 12px;
`;

export default styles;
