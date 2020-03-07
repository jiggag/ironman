import React from 'react';
import { View } from 'react-native-ui-lib';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Constant from '../utils/constants';

const RadioButton = ({ onPress, value, isSelected }) => (
  <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={onPress}>
    <View row>
      <View style={[styles.radio, !!isSelected && styles.selectedRadio]} />
      <Text style={styles.valueText}>{value}</Text>
    </View>
  </TouchableOpacity>
);

export default RadioButton;

const styles =  StyleSheet.create({
  button: {
    alignItems: 'center',
  },
  radio: {
    height: 14,
    width: 14,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: Constant.WHITE_COLOR,
    elevation: 5,
    shadowColor: Constant.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  selectedRadio: {
    backgroundColor: Constant.MAIN_COLOR,
  },
  valueText: {
    fontSize: 12,
    marginLeft: 2,
    marginRight: 8,
  }
});
