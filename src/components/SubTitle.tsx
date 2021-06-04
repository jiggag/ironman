import React, { memo, useMemo } from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import { DynamicStyleSheet, DynamicValue, useDynamicValue } from 'react-native-dynamic';
import { FontSize, FontWeight, Theme } from '@utils/constants';

interface SubTitleProps {
  title: string;
  style?: StyleProp<TextStyle>;
}

export const SubTitle = memo<SubTitleProps>(({ title, style }) => {
  const styles = useDynamicValue(dynamicStyles);
  const customStyle = useMemo<StyleProp<TextStyle>>(() => [styles.subTitle, style], [style, styles.subTitle]);
  return <Text style={customStyle}>{title}</Text>;
});

const dynamicStyles = new DynamicStyleSheet({
  subTitle: {
    color: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    fontSize: FontSize.normal,
    fontWeight: FontWeight.bold,
    marginVertical: 4,
    textDecorationLine: 'underline',
  },
});
