import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native-ui-lib';
import { DynamicStyleSheet, DynamicValue, useDynamicValue } from 'react-native-dynamic';
import { FontSize, Theme } from '@utils/constants';

interface RadioButtonProps {
  onPress: () => void;
  value: string;
  isSelected: boolean;
}

export const RadioButton = memo<RadioButtonProps>(({ onPress, value, isSelected }) => {
  const styles = useDynamicValue(dynamicStyles);
  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={onPress}>
      <View row centerV>
        <View style={[styles.radio, isSelected && styles.selectedRadio]} />
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
});

const dynamicStyles = new DynamicStyleSheet({
  button: {
    alignItems: 'center',
  },
  radio: {
    backgroundColor: new DynamicValue(Theme.light.background, Theme.dark.background),
    borderRadius: 14,
    borderWidth: 1,
    borderColor: new DynamicValue(Theme.light.subBase, Theme.dark.subBase),
    elevation: 5,
    height: 14,
    shadowColor: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 14,
  },
  selectedRadio: {
    backgroundColor: new DynamicValue(Theme.light.highlight, Theme.dark.highlight),
  },
  valueText: {
    color: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    fontSize: FontSize.normal,
    marginLeft: 2,
    marginRight: 8,
  },
});
