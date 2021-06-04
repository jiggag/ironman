import React, { memo } from 'react';
import { Text, View } from 'react-native-ui-lib';

interface ListEmptyProps {
  text: string;
}

export const ListEmpty = memo(({ text }: ListEmptyProps) => (
  <View marginV-50 flex center>
    <Text>{text}</Text>
  </View>
));
