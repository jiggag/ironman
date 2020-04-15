import React, { memo } from 'react';
import { View } from 'react-native-ui-lib';
import { Text, FlatList } from 'react-native';
import styles from './styles';
import HeaderComponent from './Header';
import { Header } from '../../components';
import NoteComponent from './Note';

interface ListType {
  list: any[];
  graph: any[];
  onActionToCreate: () => void;
  onPress: (id: number) => void;
  onPressBack: () => void;
  onNext: () => void;
}

const Presenter = memo(({
  list, graph, onActionToCreate, onPress, onPressBack, onNext,
}: ListType) => (
  <>
    <Header onPress={onPressBack} onPressRightButton={onActionToCreate} type="CREATE" />
    <FlatList
      style={styles.container}
      ListHeaderComponent={<HeaderComponent data={graph} />}
      ListEmptyComponent={(
        <View style={styles.emptyCard}>
          <Text>없음</Text>
        </View>
      )}
      data={list}
      renderItem={({ item }) => <NoteComponent data={item} onPress={onPress} />}
      keyExtractor={(item: { id: number }, index) => `${item.id}${index}`}
      onEndReached={onNext}
      onEndReachedThreshold={0.01}
    />
  </>
));

export default Presenter;
