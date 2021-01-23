import React, { memo } from 'react';
import { View } from 'react-native-ui-lib';
import {
  Text, TouchableOpacity, StyleProp, TextStyle,
} from 'react-native';

interface HeaderRightButtonProps {
  isVisible: boolean;
  buttonIdx: number;
  text: string;
  onPress: () => void;
  style: StyleProp<TextStyle>;
}

const HeaderRightButton = memo<HeaderRightButtonProps>(({
  isVisible, buttonIdx, text, onPress, style
}) => {
  return isVisible && (
    <View right centerV marginR-10={!!buttonIdx}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View flex center>
          <Text style={style}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
});

export default HeaderRightButton;
