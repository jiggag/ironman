import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Constant from '../utils/constants';

const BigButton = ({ onPress, text, buttonStyle, ...rest }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={[styles.button, buttonStyle]} {...rest}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

export default BigButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Constant.MAIN_COLOR,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 6,
    elevation: 2,
    shadowColor: Constant.SHADOW_COLOR,
    shadowOffset: {
      width: 6,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: Constant.WHITE_COLOR,
    fontWeight: '600',
    fontSize: 16,
  },
});
