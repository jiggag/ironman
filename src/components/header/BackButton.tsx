import React, { memo } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import Constant, { FontSize, FontWeight } from '@utils/constants';

interface BackButtonProps {
  onPress: () => void;
}

export const BackButton = memo<BackButtonProps>(({ onPress }) => {
  return (
    <View flex left>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View flex center>
          <Text style={styles.backButtonText}>뒤로가기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  backButtonText: {
    color: Constant.SHADOW_COLOR,
    fontSize: FontSize.normal,
    fontWeight: FontWeight.bold,
    paddingHorizontal: 10,
  },
});
