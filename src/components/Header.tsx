import React from 'react';
import { View } from 'react-native-ui-lib';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Constant from '../utils/constants';

const Header = ({ onPress }) => (
  <View row style={styles.header}>
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View paddingV-10>
        <Text style={styles.backButtonText}>뒤로가기</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default Header;

const styles =  StyleSheet.create({
  header: {
    backgroundColor: Constant.MAIN_COLOR,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  backButtonText: {
    color: Constant.WHITE_COLOR,
    fontWeight: '600',
    fontSize: 14,
  },
});
