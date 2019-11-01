import React from 'react';
import { TextInput, Text, ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import styles from './styles';
import moment from 'moment';
import { BigButton, SubTitle, Header } from '../../components';
import Constant from '../../utils/constants';

const Presenter = ({ onPressBack, note: { title, date, food, done, etc, state, weather }, onPress })=> (
  <>
    <Header onPress={onPressBack} />
    <ScrollView>
      <View paddingH-20>
        <View marginB-10>
          <TextInput
            style={styles.dateText}
            underlineColorAndroid='transparent'
            value={moment(date).format('YYYY.MM.DD')}
            placeholderTextColor={Constant.PLACEHOLDER_COLOR}
            editable={false}
          />
        </View>
        <View marginB-10>
          <SubTitle title="제목" />
          <View style={styles.inputLine}>
            <TextInput
              style={styles.input}
              underlineColorAndroid='transparent'
              value={title}
              placeholderTextColor={Constant.PLACEHOLDER_COLOR}
              editable={false}
            />
          </View>
        </View>
        <View marginB-10>
          <SubTitle title="상태" />
          <View row>
            <Text>{state}</Text>
          </View>
        </View>
        <View marginB-10>
          <SubTitle title="날씨" />
          <View row>
            <Text>{weather}</Text>
          </View>
        </View>
        <View marginB-10>
          <SubTitle title="식단" />
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              underlineColorAndroid='transparent'
              value={food}
              placeholderTextColor={Constant.PLACEHOLDER_COLOR}
              multiline
              editable={false}
            />
          </View>
        </View>
        <View marginB-10>
          <SubTitle title="한 일" />
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              underlineColorAndroid='transparent'
              value={done}
              placeholderTextColor={Constant.PLACEHOLDER_COLOR}
              multiline
              editable={false}
            />
          </View>
        </View>
        <View marginB-10>
          <SubTitle title="기타" />
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              underlineColorAndroid='transparent'
              value={etc}
              placeholderTextColor={Constant.PLACEHOLDER_COLOR}
              multiline
              editable={false}
            />
          </View>
        </View>
      </View>
      <BigButton
        onPress={onPress}
        text="수정"
        underlayColor={Constant.WHITE_COLOR}
        buttonStyle={{ backgroundColor: Constant.MAIN_COLOR }}
      />
    </ScrollView>
  </>
);

export default Presenter;