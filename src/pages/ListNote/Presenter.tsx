import React from 'react';
import { View } from 'react-native-ui-lib';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';
import styles from './styles';
import {Header, BigButton} from '../../components';
import Constant from '../../utils/constants';

const Presenter = ({ isLoading, list, onActionToCreate, onPress, onPressBack }) => (
  <>
    <Header onPress={onPressBack} />
    <ScrollView style={styles.container}>
      {
          !isLoading ? (
              list.length > 0 ? (
              list.map(item => {
                const {id, date, title} = item;
                return (
                  <View paddingH-20 marginB-10 marginT-10={id === 1} key={id}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(id)}>
                      <View paddingV-10 paddingH-15 style={styles.noteCard}>
                        <Text style={styles.dateText}>{moment(date).format('YYYY.MM.DD')}</Text>
                        <Text style={styles.titleText}>{title}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <View style={styles.emptyCard}>
                <Text>없음</Text>
              </View>
            )
          ) : (
            <View style={styles.emptyCard}>
                <Text>로딩중...</Text>
            </View>
          )
      }
    </ScrollView>
    <BigButton
      onPress={onActionToCreate}
      text="기록하기"
      buttonStyle={{ backgroundColor: Constant.MAIN_COLOR }}
    />
  </>
);

export default Presenter;
