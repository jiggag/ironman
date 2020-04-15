import React, { memo } from 'react';
import { Text, StyleSheet } from 'react-native';

interface SubTitleType {
  title: string;
  style?: object;
}

const SubTitle = memo(({ title, style = {} }: SubTitleType) => <Text style={[styles.subTitle, style]}>{title}</Text>);

export default SubTitle;

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
    marginVertical: 4,
  },
});
