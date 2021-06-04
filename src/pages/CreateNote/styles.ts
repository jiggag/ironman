import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import { Theme } from '@utils/constants';

export const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
  },
  inputBox: {
    backgroundColor: new DynamicValue(Theme.light.background, Theme.dark.background),
    borderRadius: 2,
    elevation: 5,
    padding: 10,
    shadowColor: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputLine: {
    backgroundColor: new DynamicValue(Theme.light.background, Theme.dark.background),
    borderRadius: 2,
    elevation: 5,
    paddingHorizontal: 10,
    shadowColor: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  pickerWrapper: {
    zIndex: 9,
  },
  safeAreaView: {
    backgroundColor: new DynamicValue(Theme.light.background, Theme.dark.background),
    flex: 1,
  },
});
