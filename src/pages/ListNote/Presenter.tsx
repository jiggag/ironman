import React from 'react';
import { View } from 'react-native-ui-lib';
import { Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import moment from 'moment';
import styles from './styles';
import { BigButton, Header } from '../../components';

const Presenter = ({ list, onActionToCreate, onPress, onPressBack }) => (
  <>
    <Header onPress={onPressBack} />
    <ScrollView style={styles.container}>
      <View marginV-10>
        <BigButton
          onPress={onActionToCreate}
          text="기록하기"
          buttonStyle={{ backgroundColor: '#ec2' }}
        />
      </View>
      {
        list.length > 0 ? (
          list.map(item => {
            const {id, date, title} = item;
            return (
              <View paddingH-20 marginB-10 key={id}>
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
          <View paddingH-20 marginB-10 flex>
            <View paddingV-10 paddingH-15 style={styles.emptyCard}>
              <Text>없음</Text>
            </View>
          </View>
        )
      }
    </ScrollView>
  </>
);

export default Presenter;