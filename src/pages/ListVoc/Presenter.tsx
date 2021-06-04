import React, { memo, useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { View } from 'react-native-ui-lib';
import { useDynamicValue } from 'react-native-dynamic';
import { Header } from '@components/header/Header';
import { ListEmpty } from '@components/list/ListEmpty';
import { Theme } from '@utils/constants';
import { VocData } from '../../types';
import { dynamicStyles, Title, Content } from './styles';

interface VocProps {
  list: VocData[];
  onPressBack: () => void;
}

const VocComponent = ({ title, content }) => {
  const color = useDynamicValue(Theme.light.shadow, Theme.dark.shadow);
  return (
    <View flex paddingV-15>
      <Title color={color}>{title}</Title>
      <Content color={color}>{content}</Content>
    </View>
  );
};

const Presenter = memo(({ list, onPressBack }: VocProps) => {
  const styles = useDynamicValue(dynamicStyles);

  const keyExtractor = useCallback((item, index) => `${item.id}${index}`, []);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<VocData>) => <VocComponent {...item} />, []);

  return (
    <>
      <Header onPress={onPressBack} />
      <FlatList
        style={styles.container}
        ListEmptyComponent={<ListEmpty text="등록된 문의사항이 없습니다" />}
        data={list}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </>
  );
});

export default Presenter;
