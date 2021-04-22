import React, { memo, useMemo } from 'react';
import {
  Text, StyleSheet, StyleProp, TextStyle,
} from 'react-native';
import Constant from '@utils/constants';

interface SubTitleProps {
  title: string;
  style?: StyleProp<TextStyle>;
}

export const SubTitle = memo<SubTitleProps>(({ title, style }) => {
  const customStyle = useMemo<StyleProp<TextStyle>>(() => [styles.subTitle, style], [style]);
  return <Text style={customStyle}>{title}</Text>;
});

const styles = StyleSheet.create({
  subTitle: {
    color: Constant.BLACK,
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 4,
    textDecorationLine: 'underline',
  },
});
