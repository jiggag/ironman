import React from 'react';
import { View } from 'react-native-ui-lib';
import { Text, TouchableOpacity, FlatList } from 'react-native';
import moment from 'moment';
import styles from './styles';
import { Header, BigButton, LineGraph } from '../../components';
import Constant from '../../utils/constants';

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
  const { id, date, title } = data;
  return (
    <View paddingH-20 marginB-10 marginT-10={id === 1}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(id)}>
        <View paddingV-10 paddingH-15 style={styles.noteCard}>
          <Text style={styles.dateText}>{moment(date).format('YYYY.MM.DD')}</Text>
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
    <Header onPress={onPressBack} />
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
    <BigButton
      onPress={onActionToCreate}
      text="기록하기"
      buttonStyle={{ backgroundColor: Constant.MAIN_COLOR, borderRadius: 3 }}
    />
  </>
);

export default Presenter;
