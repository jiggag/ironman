import React, { useMemo } from 'react';
import {
  Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle,
} from 'react-native';
import { DynamicStyleSheet, DynamicValue, useDynamicValue } from 'react-native-dynamic';
import { FontSize, FontWeight, Theme } from '@utils/constants';

export interface ButtonProps {
  onPress: () => void;
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const BigButton: React.FC<ButtonProps> = ({
  onPress, text, buttonStyle, textStyle,
}) => {
  const styles = useDynamicValue(dynamicStyles);
  const customButtonStyle = useMemo<StyleProp<ViewStyle>>(() => [styles.button, buttonStyle], [
    buttonStyle,
    styles.button,
  ]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={customButtonStyle}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export const MainBigButton: React.FC<ButtonProps> = ({ text, onPress }) => {
  const styles = useDynamicValue(dynamicStyles);
  return <BigButton text={text} onPress={onPress} buttonStyle={styles.mainButton} textStyle={styles.mainButtonText} />;
};

const dynamicStyles = new DynamicStyleSheet({
  button: {
    alignItems: 'center',
    backgroundColor: new DynamicValue(Theme.light.subBase, Theme.dark.subBase),
    borderRadius: 2,
    elevation: 4,
    marginHorizontal: 20,
    marginVertical: 8,
    paddingVertical: 14,
    shadowColor: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  buttonText: {
    color: new DynamicValue(Theme.light.text, Theme.dark.text),
    fontSize: FontSize.button,
    fontWeight: FontWeight.bold,
  },
  mainButton: {
    backgroundColor: new DynamicValue(Theme.light.base, Theme.dark.base),
    borderRadius: 2,
    borderWidth: 0,
    paddingVertical: 20,
  },
  mainButtonText: {
    color: new DynamicValue(Theme.light.text, Theme.dark.text),
    fontWeight: FontWeight.bold,
  },
});
