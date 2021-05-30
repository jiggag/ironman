import React, { memo, useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { View } from 'react-native-ui-lib';
import { Header } from '@components/header/Header';
import { ListEmpty } from '@components/list/ListEmpty';
import { VocData } from '../../types';
import styles, { Title, Content } from './styles';

interface VocProps {
  list: VocData[];
  onPressBack: () => void;
}

const VocComponent = ({ title, content }) => {
  return (
    <View flex paddingV-15>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </View>
  );
};

const Presenter = memo(({ list, onPressBack }: VocProps) => {
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
