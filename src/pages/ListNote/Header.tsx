import React, { memo } from 'react';
import { View } from 'react-native-ui-lib';
import { LineGraph } from '@components/LineGraph';

const Header = memo(({ data }: { data: number[] }) => {
  return (
    <View marginV-10>
      <LineGraph data={data} />
    </View>
  );
});

export default Header;
