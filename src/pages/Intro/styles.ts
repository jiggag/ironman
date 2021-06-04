import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import {
  Color, DefaultFontStyle, FontSize, FontWeight, Theme,
} from '@utils/constants';

export const BUTTON_HEIGHT = 90;

export const dynamicStyles = new DynamicStyleSheet({
  loginPopup: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    bottom: 0,
    elevation: 5,
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    position: 'absolute',
    shadowColor: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
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
    backgroundColor: new DynamicValue(Theme.light.base, Theme.dark.base),
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});
