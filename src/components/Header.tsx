import React from 'react';
import { View } from 'react-native-ui-lib';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Constant from '../utils/constants';

const Header = ({ onPress }) => (
  <View row style={styles.header}>
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View paddingV-10>
        <Text>>>></Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default Header;

const styles =  StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: Constant.MAIN_COLOR,
  }
});
