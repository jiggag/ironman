import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import { BUTTON_TYPE, Header } from '@components/header/Header';
import { ListEmpty } from '@components/list/ListEmpty';
import { NoteData } from '../../types';
import HeaderComponent from './Header';
import NoteComponent from './Note';
import { dynamicStyles } from './styles';

interface ListType {
  list: NoteData[];
  graph: number[];
  onActionToCreate: () => void;
  onPress: (id: number) => void;
  onPressBack: () => void;
  onNext: () => void;
}

const Presenter = memo(({
  list, graph, onActionToCreate, onPress, onPressBack, onNext,
}: ListType) => {
  const styles = useDynamicValue(dynamicStyles);
  const customStyle = useMemo(
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
      <Header onPress={onPressBack} onPressRightButton={onActionToCreate} type={BUTTON_TYPE.CREATE} />
      <FlatList
        style={styles.container}
        contentContainerStyle={customStyle.contentContainer}
        ListHeaderComponent={<HeaderComponent data={graph} />}
        ListEmptyComponent={<ListEmpty text="기록을 남겨주세요" />}
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
