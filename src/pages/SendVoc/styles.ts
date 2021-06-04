import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import { Theme } from '@utils/constants';

export const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
  },
  inputContent: {
    display: 'flex',
    flex: 1,
    minHeight: 240,
    color: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
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
  inputTitle: {
    display: 'flex',
    flex: 1,
    minHeight: 40,
    color: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
  },
  safeAreaView: {
    backgroundColor: new DynamicValue(Theme.light.background, Theme.dark.background),
    flex: 1,
  },
});
