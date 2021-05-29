import { StyleSheet } from 'react-native';
import {
  Color, DefaultFontStyle, FontSize, FontWeight,
} from '@utils/constants';

export const BUTTON_HEIGHT = 90;

const styles = StyleSheet.create({
  loginPopup: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    bottom: 0,
    elevation: 5,
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    position: 'absolute',
    shadowColor: Color.black,
    shadowOffset: {
      width: 5,
      height: -10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    width: '100%',
  },
  logo: {
    ...DefaultFontStyle,
    color: Color.white,
    fontSize: FontSize.title,
    fontWeight: FontWeight.bold,
  },
  safeAreaView: {
    backgroundColor: Color.blue,
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
