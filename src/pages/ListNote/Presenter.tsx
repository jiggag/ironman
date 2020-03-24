import React from 'react';
import { View } from 'react-native-ui-lib';
import { Text, TouchableOpacity, FlatList } from 'react-native';
import moment from 'moment';
import _find from 'lodash/find';
import PropTypes from 'prop-types';
import styles, {
  State, StateText, Weather, WeatherText 
} from './styles';
import { Header, LineGraph } from '../../components';
import { weatherList } from '../../utils/common';

const HeaderComponent = ({ data }) => {
  return (
    <View marginV-10>
      <LineGraph data={data} />
    </View>
  );
};
const EmptyComponent = () => {
  return (
    <View style={styles.emptyCard}>
      <Text>없음</Text>
    </View>
  );
};
const ItemComponent = ({ data, onPress }) => {
  const {
    id, date, title, state, weather 
  } = data;
  return (
    <View marginH-20 marginB-10 marginT-10={id === 1} style={styles.itemComponent}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(id)}>
        <View paddingV-10 paddingH-15 style={styles.noteCard}>
          <View flex row>
            <Text style={styles.dateText}>{moment(date).format('YYYY.MM.DD')}</Text>
            <Weather>
              <WeatherText>{_find(weatherList, { id: weather }).value}</WeatherText>
            </Weather>
            <State>
              <StateText state={state}>{state}</StateText>
            </State>
          </View>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Presenter = ({
  list, graph, onActionToCreate, onPress, onPressBack, onNext 
}) => (
  <>
    <Header onPress={onPressBack} onPressRightButton={onActionToCreate} type="CREATE" />
    <FlatList
      style={styles.container}
      ListHeaderComponent={() => <HeaderComponent data={graph} />}
      ListEmptyComponent={EmptyComponent}
      data={list}
      renderItem={({ item }) => <ItemComponent data={item} onPress={onPress} />}
      keyExtractor={(item: { id: number }, index) => `${item.id}${index}`}
      onEndReached={onNext}
      onEndReachedThreshold={0.01}
    />
  </>
);

export default Presenter;

ItemComponent.defaultProps = {
  data: {
    id: 0,
    date: 0,
    title: '',
    state: 0,
    weather: 0,
  },
  onPress: () => {},
};
ItemComponent.propTypes = {
  data: PropTypes.object,
  onPress: PropTypes.func,
};
HeaderComponent.defaultProps = {
  data: [],
};
HeaderComponent.propTypes = {
  data: PropTypes.array,
};
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
