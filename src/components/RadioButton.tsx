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
    height: 16,
    width: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  selectedRadio: {
    backgroundColor: Constant.MAIN_COLOR,
  },
  valueText: {
    fontSize: 16,
    marginLeft: 2,
    marginRight: 8,
  }
});
