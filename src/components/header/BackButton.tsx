import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native-ui-lib';
import { DynamicStyleSheet, DynamicValue, useDynamicValue } from 'react-native-dynamic';
import { FontSize, FontWeight, Theme } from '@utils/constants';

interface BackButtonProps {
  onPress: () => void;
}

export const BackButton = memo<BackButtonProps>(({ onPress }) => {
  const styles = useDynamicValue(dynamicStyles);
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

const dynamicStyles = new DynamicStyleSheet({
  backButtonText: {
    color: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    fontSize: FontSize.normal,
    fontWeight: FontWeight.bold,
    paddingHorizontal: 10,
  },
});
