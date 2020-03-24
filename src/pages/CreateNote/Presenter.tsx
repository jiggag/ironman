import React from 'react';
import { TextInput, ScrollView, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { View } from 'react-native-ui-lib';
import moment from 'moment';
import PropTypes from 'prop-types';
import styles from './styles';
import { RadioButton, SubTitle, Header } from '../../components';
import {
  stateList, weatherList, foodList, doneList 
} from '../../utils/common';
import Constant from '../../utils/constants';

const Presenter = ({
  onPressBack, note: {
    title, date, food, done, etc, state, weather 
  }, onPress, onChangeNote 
}) => (
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
            onDateChange={date => onChangeNote({ date: moment(date, 'YYYY.MM.DD').valueOf() })}
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
        <View marginB-10>
          <SubTitle title="상태" />
          <View row>
            {stateList.map(({ id, value }) => (
              <View flex left key={id}>
                <RadioButton onPress={() => onChangeNote({ state: id })} value={value} isSelected={state === id} />
              </View>
            ))}
          </View>
        </View>
        <View marginB-10>
          <SubTitle title="날씨" />
          <View row>
            {weatherList
              .filter(({ visible }) => visible)
              .map(({ id, value }) => (
                <View flex left key={id}>
                  <RadioButton
                    onPress={() => onChangeNote({ weather: id })}
                    value={value}
                    isSelected={weather === id}
                  />
                </View>
              ))}
          </View>
        </View>
        <View marginB-10>
          <SubTitle title="식단" />
          {foodList.map(({ id, value }) => (
            <View style={styles.inputRow} flex row key={id}>
              <View flex-1>
                <Text>{value}</Text>
              </View>
              <View flex-3>
                <TextInput
                  scrollEnabled={false}
                  style={styles.input}
                  placeholder="입력하세요"
                  underlineColorAndroid="transparent"
                  onChangeText={value => onChangeNote({ food: { ...food, [id]: value } })}
                  value={food && food[id]}
                  placeholderTextColor={Constant.PLACEHOLDER_COLOR}
                  multiline
                />
              </View>
            </View>
          ))}
        </View>
        <View marginB-10>
          <SubTitle title="한 일" />
          {doneList.map(({ id, value }) => (
            <View style={styles.inputRow} flex row key={id}>
              <View flex-1>
                <Text>{value}</Text>
              </View>
              <View flex-3>
                <TextInput
                  scrollEnabled={false}
                  style={styles.input}
                  placeholder="입력하세요"
                  underlineColorAndroid="transparent"
                  onChangeText={value => onChangeNote({ done: { ...done, [id]: value } })}
                  value={done && done[id]}
                  placeholderTextColor={Constant.PLACEHOLDER_COLOR}
                  multiline
                />
              </View>
            </View>
          ))}
        </View>
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
      {/* <View marginB-10>
        <View style={styles.cameraView}>
          <TouchableOpacity activeOpacity={0.5} onPress={onPressImage}>
            {
              !!image ?
              <FastImage
                source={image}
                resizeMode={FastImage.resizeMode.cover}
                style={{ width: '100%', height: '100%' }}
              /> :
              <FastImage
                source={require('../../assets/camera.png')}
                resizeMode={FastImage.resizeMode.center}
                style={{ width: '100%', height: '100%' }}
              />

            }
          </TouchableOpacity>
        </View>
      </View> */}
    </ScrollView>
  </>
);

export default Presenter;

Presenter.defaultProps = {
  onPressBack: () => {},
  note: {
    title: '',
    date: 0,
    food: 0,
    done: 0,
    etc: 0,
    state: 0,
    weather: 0,
  },
  onPress: () => {},
  onChangeNote: () => {},
};
Presenter.propTypes = {
  onPressBack: PropTypes.func,
  note: PropTypes.object,
  onPress: PropTypes.func,
  onChangeNote: PropTypes.func,
};
