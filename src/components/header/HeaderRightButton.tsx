import React, { memo } from 'react';
import {
  Text, TouchableOpacity, StyleProp, TextStyle,
} from 'react-native';
import { View } from 'react-native-ui-lib';

interface HeaderRightButtonProps {
  isVisible: boolean;
  buttonIdx: number;
  text: string;
  onPress?: () => void;
  style: StyleProp<TextStyle>;
}

export const HeaderRightButton = memo<HeaderRightButtonProps>(({
  isVisible, buttonIdx, text, onPress, style,
}) => {
  return isVisible ? (
    <View right centerV marginR-10={!!buttonIdx}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View flex center>
          <Text style={style}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  ) : null;
});
