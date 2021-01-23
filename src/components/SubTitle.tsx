import React, { memo, useMemo } from 'react';
import {
  Text, StyleSheet, StyleProp, TextStyle,
} from 'react-native';

interface SubTitleProps {
  title: string;
  style?: StyleProp<TextStyle>;
}

const SubTitle = memo<SubTitleProps>(({ title, style }) => {
  const customStyle = useMemo<StyleProp<TextStyle>>(() => [styles.subTitle, style], [style]);
  return (
    <Text style={customStyle}>{title}</Text>
  );
});

export default SubTitle;

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
    marginVertical: 4,
  },
});
