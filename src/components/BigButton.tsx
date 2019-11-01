import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Constant from '../utils/constants';

const BigButton = ({ onPress, text, buttonStyle, ...rest }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.5}
    style={[styles.button, buttonStyle]}
    {...rest}
  >
    <Text>
      {text}
    </Text>
  </TouchableOpacity>
);

export default BigButton;

const styles =  StyleSheet.create({
  button: {
    borderColor: Constant.MAIN_COLOR,
    borderWidth: 2,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 20,
  }
});
