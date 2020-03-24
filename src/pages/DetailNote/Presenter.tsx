import React from 'react';
import { TextInput, Text, ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import moment from 'moment';
import PropTypes from 'prop-types';
import styles from './styles';
import { SubTitle, Header } from '../../components';
import Constant from '../../utils/constants';
import { foodList, doneList } from '../../utils/common';

const Presenter = ({
  onPressBack,
  note: {
    title, date, food, done, etc, stateText, weatherText,
  },
  onPressDelete,
  onPressUpdate,
}) => (
  <>
    <Header onPress={onPressBack} onPressRightButton={onPressUpdate} onPressDelete={onPressDelete} type="UPDATE" />
    <ScrollView style={styles.container}>
      <View paddingH-20>
        <View marginB-10>
          <TextInput
            style={styles.dateText}
            underlineColorAndroid="transparent"
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
              underlineColorAndroid="transparent"
              value={title}
              placeholderTextColor={Constant.PLACEHOLDER_COLOR}
              editable={false}
            />
          </View>
        </View>
        <View marginB-10>
          <SubTitle title="상태" />
          <View row>
            <Text>{stateText}</Text>
          </View>
        </View>
        <View marginB-10>
          <SubTitle title="날씨" />
          <View row>
            <Text>{weatherText}</Text>
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
                  underlineColorAndroid="transparent"
                  value={food && food[id]}
                  placeholderTextColor={Constant.PLACEHOLDER_COLOR}
                  multiline
                  editable={false}
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
                  underlineColorAndroid="transparent"
                  value={done && done[id]}
                  placeholderTextColor={Constant.PLACEHOLDER_COLOR}
                  multiline
                  editable={false}
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
              underlineColorAndroid="transparent"
              value={etc}
              placeholderTextColor={Constant.PLACEHOLDER_COLOR}
              multiline
              editable={false}
            />
          </View>
        </View>
      </View>
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
    stateText: '',
    weatherText: '',
  },
  onPressDelete: () => {},
  onPressUpdate: () => {},
};
Presenter.propTypes = {
  onPressBack: PropTypes.func,
  note: PropTypes.object,
  onPressDelete: PropTypes.func,
  onPressUpdate: PropTypes.func,
};
