import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native-ui-lib';
import moment from 'moment';
import _find from 'lodash/find';
import { weatherList } from '@utils/common';
import { NoteData } from '../../types';
import styles, {
  State, StateText, Weather, WeatherText,
} from './styles';

interface NoteProps {
  data: NoteData;
  onPress: (id: number) => void;
}

const Note = memo(({ data, onPress }: NoteProps) => {
  const {
    id, date, title, state, weather,
  } = data;
  return (
    <View marginH-20 marginB-10 marginT-10={id === 1} style={styles.itemComponent}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(id)}>
        <View paddingV-10 paddingH-15 style={styles.noteCard}>
          <View flex row>
            <Text style={styles.dateText}>{moment(date).format('YYYY.MM.DD')}</Text>
            <Weather>
              <WeatherText>{_find(weatherList, { id: weather })?.value}</WeatherText>
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
});

export default Note;
