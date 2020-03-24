import React from 'react';
import { View } from 'react-native-ui-lib';
import { Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import HeaderComponent from './Header';
import { Header } from '../../components';
import NoteComponent from './Note';

const Presenter = ({
  list, graph, onActionToCreate, onPress, onPressBack, onNext,
}) => (
  <>
    <Header onPress={onPressBack} onPressRightButton={onActionToCreate} type="CREATE" />
    <FlatList
      style={styles.container}
      ListHeaderComponent={() => <HeaderComponent data={graph} />}
      ListEmptyComponent={() => (
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
);

export default Presenter;

Presenter.defaultProps = {
  list: [],
  graph: [],
  onActionToCreate: () => {},
  onPress: () => {},
  onPressBack: () => {},
  onNext: () => {},
};
Presenter.propTypes = {
  list: PropTypes.array,
  graph: PropTypes.array,
  onActionToCreate: PropTypes.func,
  onPress: PropTypes.func,
  onPressBack: PropTypes.func,
  onNext: PropTypes.func,
};
