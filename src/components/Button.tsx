import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Constant from '../utils/constants';

const Button = ({ onPress, text, buttonStyle, ...rest }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.5}
    style={[styles.button, buttonStyle]}
    {...rest}
  >
    <Text style={styles.buttonText}>
      {text}
    </Text>
  </TouchableOpacity>
);

export default Button;

const styles =  StyleSheet.create({
  button: {
    backgroundColor: Constant.MAIN_COLOR,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: Constant.WHITE_COLOR,
    fontWeight: '600',
    fontSize: 16,
  },
});