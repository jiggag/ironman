import React from 'react';
import { TextInput, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { View } from 'react-native-ui-lib';
import moment from 'moment';
import styles from './styles';
import { BigButton, RadioButton, SubTitle, Header } from '../../components';
import { stateList, weatherList } from '../../utils/common';
import Constant from '../../utils/constants';

const Presenter = ({ onPressBack, note: { title, date, food, done, etc, state, weather }, onPress, onChangeNote })=> (
  <>
    <Header onPress={onPressBack} />
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
              dateText: styles.dateText
            }}
            onDateChange={date => onChangeNote({ date: moment(date).valueOf() })}
          />
        </View>
        <View marginB-10>
          <SubTitle title="제목" />
          <View style={styles.inputLine}>
            <TextInput
              style={styles.input}
              placeholder="제목을 입력하세요"
              underlineColorAndroid='transparent'
              onChangeText={title => onChangeNote({ title })}
              value={title}
              placeholderTextColor={Constant.PLACEHOLDER_COLOR}
            />
          </View>
        </View>
        <View marginB-10>
          <SubTitle title="상태" />
          <View row>
            {
              stateList.map(({ id, value }) => (
                <RadioButton key={id} onPress={() => onChangeNote({ state: id })} value={value} isSelected={state === id} />
              ))
            }
          </View>
        </View>
        <View marginB-10>
          <SubTitle title="날씨" />
          <View row>
            {
              weatherList.map(({ id, value }) => (
                <RadioButton key={id} onPress={() => onChangeNote({ weather: id })} value={value} isSelected={weather === id} />
              ))
            }
          </View>
        </View>
        <View marginB-10>
          <SubTitle title="식단" />
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Food 입력하세요"
              underlineColorAndroid='transparent'
              onChangeText={food => onChangeNote({ food })}
              value={food}
              placeholderTextColor={Constant.PLACEHOLDER_COLOR}
              multiline
            />
          </View>
        </View>
        <View marginB-10>
          <SubTitle title="한 일" />
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder={'Done 입력하세요'}
              underlineColorAndroid='transparent'
              onChangeText={done => onChangeNote({ done })}
              value={done}
              placeholderTextColor={Constant.PLACEHOLDER_COLOR}
              multiline
            />
          </View>
        </View>
        <View marginB-10>
          <SubTitle title="기타" />
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Etc 입력하세요"
              underlineColorAndroid='transparent'
              onChangeText={etc => onChangeNote({ etc })}
              value={etc}
              placeholderTextColor={Constant.PLACEHOLDER_COLOR}
              multiline
            />
          </View>
        </View>
      </View>
    </ScrollView>
    <BigButton
      onPress={onPress}
      text="수정"
      underlayColor={Constant.WHITE_COLOR}
      buttonStyle={{ backgroundColor: Constant.MAIN_COLOR }}
    />
  </>
);

export default Presenter;
