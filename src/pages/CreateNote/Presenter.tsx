import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import moment from 'moment';
import { DatePicker } from '@components/DatePicker';
import { Header } from '@components/header/Header';
import { SelectInputBox } from '@components/SelectInputBox';
import { SelectRadioBox } from '@components/SelectRadioBox';
import { SubTitle } from '@components/SubTitle';
import { TextInput } from '@components/TextInput';
import {
  stateList, weatherList, foodList, doneList,
} from '@utils/common';
import Constant from '@utils/constants';
import { NoteData } from '../../types';
import styles from './styles';

interface NoteType {
  onPressBack: () => void;
  note: NoteData;
  onPress: () => void;
  onChangeNote: (param: Record<string, string | number | Record<number, string>>) => void;
}

const Presenter = memo(
  ({
    onPressBack, onPress, onChangeNote, note: {
      title, date, food, done, etc, state, weather,
    },
  }: NoteType) => (
    <>
      <Header onPress={onPressBack} onPressRightButton={onPress} type="SAVE" />

      <ScrollView style={styles.container}>
        <View paddingH-20>
          <View marginB-10 row style={styles.pickerWrapper}>
            <DatePicker
              date={date}
              onChangeDate={(date) => onChangeNote({ date: moment(date, 'YYYY.MM.DD').valueOf() })}
            />
          </View>
          <View marginB-10>
            <SubTitle title="제목" />
            <View style={styles.inputLine}>
              <TextInput
                placeholder="제목을 입력하세요"
                underlineColorAndroid="transparent"
                onChangeText={(title) => onChangeNote({ title })}
                value={title}
                placeholderTextColor={Constant.PLACEHOLDER_COLOR}
              />
            </View>
          </View>
          <SelectRadioBox
            data={stateList}
            title="상태"
            inputValue={state}
            inputType="state"
            onChangeNote={onChangeNote}
          />
          <SelectRadioBox
            data={weatherList}
            title="날씨"
            inputValue={weather}
            inputType="weather"
            onChangeNote={onChangeNote}
          />
          <SelectInputBox data={foodList} title="식단" inputValue={food} inputType="food" onChangeNote={onChangeNote} />
          <SelectInputBox
            data={doneList}
            title="한 일"
            inputValue={done}
            inputType="done"
            onChangeNote={onChangeNote}
          />
          <View marginB-10>
            <SubTitle title="기타" />
            <View style={styles.inputBox}>
              <TextInput
                placeholder="Etc 입력하세요"
                underlineColorAndroid="transparent"
                onChangeText={(etc) => onChangeNote({ etc })}
                value={etc}
                placeholderTextColor={Constant.PLACEHOLDER_COLOR}
                multiline
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  ),
);

export default Presenter;
