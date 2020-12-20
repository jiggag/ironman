import React, { memo } from 'react';
import { TextInput, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { View } from 'react-native-ui-lib';
import moment from 'moment';
import styles from './styles';
import { SubTitle, Header } from '../../components';
import {
  stateList, weatherList, foodList, doneList,
} from '../../utils/common';
import Constant from '../../utils/constants';
import SelectRadioBox from '../../components/SelectRadioBox';
import SelectInputBox from '../../components/SelectInputBox';
import { NoteData } from '../../types';

interface UpdateType {
  onPressBack: () => void;
  onPress: () => void;
  onChangeNote: (param: Record<string, string | number | Record<number, string>>) => void;
  note: NoteData;
}

const Presenter = memo(({
  onPressBack, note: {
    title, date, food, done, etc, state, weather,
  }, onPress, onChangeNote,
}: UpdateType) => (
  <>
    <Header onPress={onPressBack} onPressRightButton={onPress} type="SAVE" />
    <ScrollView style={styles.container}>
      <View paddingH-20>
        <View marginB-10>
          <DatePicker
            date={moment(date).toDate()}
            mode="date"
            format="YYYY.MM.DD"
            confirmBtnText="확인"
            cancelBtnText="취소"
            customStyles={{
              dateIcon: styles.dateIcon,
              dateInput: styles.dateInput,
              dateText: styles.dateText,
            }}
            onDateChange={date => onChangeNote({
              date: moment(date, 'YYYY.MM.DD')
                .startOf('days')
                .valueOf(),
            })
            }
          />
        </View>
        <View marginB-10>
          <SubTitle title="제목" />
          <View style={styles.inputLine}>
            <TextInput
              style={styles.input}
              placeholder="제목을 입력하세요"
              underlineColorAndroid="transparent"
              onChangeText={title => onChangeNote({ title })}
              value={title}
              placeholderTextColor={Constant.PLACEHOLDER_COLOR}
            />
          </View>
        </View>
        <SelectRadioBox data={stateList} title="상태" inputValue={state} inputType="state" onChangeNote={onChangeNote} />
        <SelectRadioBox data={weatherList} title="날씨" inputValue={weather} inputType="weather" onChangeNote={onChangeNote} />
        <SelectInputBox data={foodList} title="식단" inputValue={food} inputType="food" onChangeNote={onChangeNote} />
        <SelectInputBox data={doneList} title="한 일" inputValue={done} inputType="done" onChangeNote={onChangeNote} />
        <View marginB-10>
          <SubTitle title="기타" />
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Etc 입력하세요"
              underlineColorAndroid="transparent"
              onChangeText={etc => onChangeNote({ etc })}
              value={etc}
              placeholderTextColor={Constant.PLACEHOLDER_COLOR}
              multiline
            />
          </View>
        </View>
      </View>
    </ScrollView>
    {/* <BigButton
      onPress={onPress}
      text="수정"
      underlayColor={Constant.WHITE_COLOR}
      buttonStyle={{ backgroundColor: Constant.MAIN_COLOR, borderRadius: 2 }}
    /> */}
  </>
));

export default Presenter;
