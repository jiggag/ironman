import React from 'react';
import { TextInput, Text, ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import styles from './styles';
import moment from 'moment';
import { Button, SubTitle, Header } from '../../components';
import Constant from '../../utils/constants';

const Presenter = ({ onPressBack, note: { title, date, food, done, etc, state, weather }, onPressDelete, onPressUpdate })=> (
  <>
    <Header onPress={onPressBack} />
    <ScrollView style={styles.container}>
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
    </ScrollView>
    <View row paddingH-20 marginV-8>
        <Button
          onPress={onPressDelete}
          text="삭제"
          underlayColor={Constant.WHITE_COLOR}
          buttonStyle={{ backgroundColor: Constant.MAIN_COLOR, flex: 1, marginRight: 3 }}
        />
        <Button
          onPress={onPressUpdate}
          text="수정"
          underlayColor={Constant.WHITE_COLOR}
          buttonStyle={{ backgroundColor: Constant.MAIN_COLOR, flex: 2, marginLeft: 3 }}
        />
    </View>
  </>
);

export default Presenter;
