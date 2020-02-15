import React from 'react';
import { View } from 'react-native-ui-lib';
import { Text, TouchableOpacity, FlatList } from 'react-native';
import moment from 'moment';
import _find from 'lodash/find';
import styles, { Food, Category, State, StateText, Weather, WeatherText } from './styles';
import { Header, BigButton, LineGraph } from '../../components';
import Constant from '../../utils/constants';
import { weatherList } from '../../utils/common';

const HeaderComponent = ({ data }) => {
  return (
    <View marginV-10>
      <LineGraph data={data} />
    </View>
  );
}
const EmptyComponent = () => {
  return (
    <View style={styles.emptyCard}>
      <Text>없음</Text>
    </View>
  );
}
const ItemComponent = ({ data, onPress }) => {
  const { id, date, title, state, weather } = data;
  return (
    <View paddingH-20 marginB-10 marginT-10={id === 1}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(id)}>
        <View paddingV-10 paddingH-15 style={styles.noteCard}>
          <View flex row>
            <Text style={styles.dateText}>{moment(date).format('YYYY.MM.DD')}</Text>
            <Weather>
              <WeatherText>{_find(weatherList, { 'id': weather }).value}</WeatherText>
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
}
const LoadingComponent = () => {
  return (
    <View style={styles.emptyCard}>
      <Text>로딩중...</Text>
    </View>
  );
}
const Presenter = ({ isLoading, list, graph, onActionToCreate, onPress, onPressBack }) => (
  <>
    <Header onPress={onPressBack} onPressRightButton={onActionToCreate} type="CREATE" />
    {isLoading ? (
      <LoadingComponent />
    ) : (
      <FlatList
        style={styles.container}
        ListHeaderComponent={() => <HeaderComponent data={graph} />}
        ListEmptyComponent={EmptyComponent}
        data={list}
        renderItem={({ item }) => <ItemComponent data={item} onPress={onPress} />}
        keyExtractor={(item: { id: number }) => `${item.id}`}
      />
    )}
  </>
);

export default Presenter;
