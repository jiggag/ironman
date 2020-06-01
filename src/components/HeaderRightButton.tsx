import React, { memo } from 'react';
import { View } from 'react-native-ui-lib';
import {
  Text, TouchableOpacity, StyleProp, TextStyle,
} from 'react-native';

interface ButtonType {
  buttonIdx: number;
  text: string;
  onPress: () => void;
  style: StyleProp<TextStyle>;
}
interface HeaderRightButtonType extends ButtonType {
  isVisible: boolean;
}

const Button = memo(({ buttonIdx, text, onPress, style }: ButtonType) => {
  return (
    <View right centerV marginR-10={!!buttonIdx}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View paddingV-4 paddingH-6>
          <Text style={style}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
});

const HeaderRightButton = memo(({
  isVisible, ...rest
}: HeaderRightButtonType) => {
  return isVisible && <Button {...rest} />;
});

export default HeaderRightButton;
