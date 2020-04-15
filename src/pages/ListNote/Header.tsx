import React, { memo } from 'react';
import { View } from 'react-native-ui-lib';
import { LineGraph } from '../../components';

const Header = memo(({ data }: { data: any[] }) => {
  return (
    <View marginV-10>
      <LineGraph data={data} />
    </View>
  );
});

export default Header;
