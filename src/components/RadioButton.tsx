import React, { memo } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import Constant from '@utils/constants';

interface RadioButtonProps {
  onPress: () => void;
  value: string;
  isSelected: boolean;
}

export const RadioButton = memo<RadioButtonProps>(({ onPress, value, isSelected }) => (
  <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={onPress}>
    <View row>
      <View style={[styles.radio, isSelected && styles.selectedRadio]} />
      <Text style={styles.valueText}>{value}</Text>
    </View>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
  },
  radio: {
    backgroundColor: Constant.WHITE_COLOR,
    borderRadius: 14,
    borderWidth: 1,
    elevation: 5,
    height: 14,
    shadowColor: Constant.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 14,
  },
  selectedRadio: {
    backgroundColor: Constant.MAIN_COLOR,
  },
  valueText: {
    color: Constant.BLACK,
    fontSize: 12,
    marginLeft: 2,
    marginRight: 8,
  },
});
