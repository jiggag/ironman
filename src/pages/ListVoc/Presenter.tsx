import React, { memo } from 'react';
import { Text, View } from 'react-native-ui-lib';
import { FlatList } from 'react-native';
import styles, { Title, Content } from './styles';
import { Header } from '../../components';

interface VocType {
  list: any[],
  onPressBack: () => void,
}

const VocComponent = ({ title, content }) => {
  return (
    <View flex paddingV-15>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </View>
  )
};

const Presenter = memo(({ list, onPressBack }: VocType) => (
  <>
    <Header onPress={onPressBack} />
    <FlatList
      style={styles.container}
      ListEmptyComponent={(
        <View style={styles.emptyCard}>
          <Text>없음</Text>
        </View>
      )}
      data={list}
      renderItem={({ item }) => <VocComponent {...item} />}
      keyExtractor={(item: { id: number }, index) => `${item.id}${index}`}
    />
  </>
));

export default Presenter;
