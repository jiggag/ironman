import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import { FontSize, FontWeight, Theme } from '@utils/constants';

export const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
  },
  dateIcon: {
    display: 'none',
  },
  dateInput: {
    borderBottomWidth: 1,
    borderWidth: 0,
    height: 20,
    left: 0,
    position: 'absolute',
  },
  dateText: {
    color: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    fontSize: FontSize.button,
    fontWeight: FontWeight.bold,
  },
  inputSubText: {
    color: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    fontSize: FontSize.normal,
  },
  input: {
    display: 'flex',
    flex: 1,
    minHeight: 40,
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
  inputRow: {
    backgroundColor: new DynamicValue(Theme.light.background, Theme.dark.background),
    borderRadius: 2,
    elevation: 5,
    marginVertical: 5,
    padding: 10,
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
