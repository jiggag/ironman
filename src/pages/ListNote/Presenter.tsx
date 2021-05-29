import React, { memo, useCallback, useMemo } from 'react';
import { Text, FlatList, ListRenderItemInfo } from 'react-native';
import { View } from 'react-native-ui-lib';
import { Header } from '@components/Header';
import { NoteData } from '../../types';
import HeaderComponent from './Header';
import NoteComponent from './Note';
import styles from './styles';

interface ListType {
  list: NoteData[];
  graph: number[];
  onActionToCreate: () => void;
  onPress: (id: number) => void;
  onPressBack: () => void;
  onNext: () => void;
}

const ListEmptyComponent = memo(() => (
  <View marginV-50 style={styles.emptyCard}>
    <Text>기록을 남겨주세요</Text>
  </View>
));

const Presenter = memo(({
  list, graph, onActionToCreate, onPress, onPressBack, onNext,
}: ListType) => {
  const dynamicStyle = useMemo(
    () => ({
      contentContainer: { flex: list.length ? undefined : 1 },
    }),
    [list.length],
  );

  const keyExtractor = useCallback((item, index) => `${item.id}${index}`, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<NoteData>) => <NoteComponent data={item} onPress={onPress} />,
    [onPress],
  );

  return (
    <>
      <Header onPress={onPressBack} onPressRightButton={onActionToCreate} type="CREATE" />
      <FlatList
        style={styles.container}
        contentContainerStyle={dynamicStyle.contentContainer}
        ListHeaderComponent={<HeaderComponent data={graph} />}
        ListEmptyComponent={<ListEmptyComponent />}
        data={list}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onNext}
        onEndReachedThreshold={0.01}
      />
    </>
  );
});

export default Presenter;
