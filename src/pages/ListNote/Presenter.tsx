import React from 'react';
import { View } from 'react-native-ui-lib';
import { Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import HeaderComponent from './Header';
import { Header } from '../../components';
import NoteComponent from './Note';
import { PieChart } from 'react-native-svg-charts';

const Presenter = ({
  list, graph, onActionToCreate, onPress, onPressBack, onNext, getPieData
}) => (
  <>
    <Header onPress={onPressBack} onPressRightButton={onActionToCreate} type="CREATE" />
    <View style={{
      position: 'relative',
    }}>
      <PieChart data={getPieData(graph)} innerRadius="80%" padAngle={0} style={{ height: 100 }} />
      <View row center style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
      }}>
        <Text>퍼센트</Text>
      </View>
    </View>
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
