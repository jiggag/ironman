import React from 'react';
import { StyleSheet } from 'react-native';
import { BigButton, ButtonProps } from '@components/button/BigButton';
import Constant from '@utils/constants';

export const TextLineButton: React.FC<ButtonProps> = ({ text, onPress }) => {
  return (
    <BigButton
      text={text}
      onPress={onPress}
      buttonStyle={styles.textLineButton}
      textStyle={styles.textLineButtonText}
    />
  );
};

const styles = StyleSheet.create({
  textLineButton: {
    backgroundColor: Constant.WHITE_COLOR,
    elevation: 0,
    paddingVertical: 20,
    shadowOpacity: 0,
  },
  textLineButtonText: {
    color: Constant.MAIN_COLOR,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
