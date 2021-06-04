import React from 'react';
import { DynamicStyleSheet, DynamicValue, useDynamicValue } from 'react-native-dynamic';
import { BigButton, ButtonProps } from '@components/button/BigButton';
import { FontWeight, Theme } from '@utils/constants';

export const TextLineButton: React.FC<ButtonProps> = ({ text, onPress }) => {
  const styles = useDynamicValue(dynamicStyles);
  return (
    <BigButton
      text={text}
      onPress={onPress}
      buttonStyle={styles.textLineButton}
      textStyle={styles.textLineButtonText}
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  textLineButton: {
    color: new DynamicValue(Theme.light.text, Theme.dark.text),
    elevation: 0,
    paddingVertical: 20,
    shadowOpacity: 0,
  },
  textLineButtonText: {
    color: new DynamicValue(Theme.light.base, Theme.dark.base),
    fontWeight: FontWeight.bold,
    textDecorationLine: 'underline',
  },
});
