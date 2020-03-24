import React, { memo } from 'react';
import { View } from 'react-native-ui-lib';
import {
  Text, TouchableOpacity, StyleProp, TextStyle,
} from 'react-native';

interface HeaderRightButtonType {
  isVisible: boolean;
  buttonIdx: number;
  text: string;
  onPress: () => void;
  style: StyleProp<TextStyle>;
}

const HeaderRightButton = memo(({
  isVisible, buttonIdx, text, onPress, style,
}: HeaderRightButtonType) => {
  return (
    isVisible && (
      <View right centerV marginR-10={!!buttonIdx}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <View paddingV-4 paddingH-6>
            <Text style={style}>{text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  );
});

export default HeaderRightButton;
