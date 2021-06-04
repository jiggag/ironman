import React, { memo } from 'react';
import { Text, ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import moment from 'moment';
import { useDynamicValue } from 'react-native-dynamic';
import { BUTTON_TYPE, Header } from '@components/header/Header';
import { SelectInputBox } from '@components/SelectInputBox';
import { SubTitle } from '@components/SubTitle';
import { TextInput } from '@components/TextInput';
import { foodList, doneList } from '@utils/common';
import Constant from '@utils/constants';
import { NoteData } from '../../types';
import { dynamicStyles } from './styles';

interface DetailType {
  onPressBack: () => void;
  note: Partial<
    NoteData & {
      stateText: string;
      weatherText: string;
    }
  >;
  onPressDelete: () => void;
  onPressUpdate: () => void;
}

const Presenter = memo(
  ({
    onPressBack,
    note: {
      title, date, food, done, etc, stateText, weatherText,
    },
    onPressDelete,
    onPressUpdate,
  }: DetailType) => {
    const styles = useDynamicValue(dynamicStyles);

    return (
      <>
        <Header
          onPress={onPressBack}
          onPressRightButton={onPressUpdate}
          onPressDelete={onPressDelete}
          type={BUTTON_TYPE.UPDATE}
        />
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
                  style={styles.inputSubText}
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
                <Text style={styles.inputText}>{stateText}</Text>
              </View>
            </View>
            <View marginB-10>
              <SubTitle title="날씨" />
              <View row>
                <Text style={styles.inputText}>{weatherText}</Text>
              </View>
            </View>
            <SelectInputBox data={foodList} title="식단" inputValue={food || {}} inputType="food" editable={false} />
            <SelectInputBox data={doneList} title="한 일" inputValue={done || {}} inputType="food" editable={false} />
            <View marginB-10>
              <SubTitle title="기타" />
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.inputSubText}
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
  },
);

export default Presenter;
