import { Text, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import React, { memo } from 'react';
import { SubTitle } from './index';
import Constant from '../utils/constants';
import TextInput from './TextInput';

interface SelectInputBoxProps {
  data: {
    id: number;
    value: string;
  }[];
  inputValue: Record<number, string>;
  inputType: string;
  title: string;
  editable?: boolean;
  onChangeNote?: (param: Record<string, Record<number, string>>) => void;
}
const SelectInputBox = memo(({
  title, data, onChangeNote, inputValue, inputType, editable = true,
}: SelectInputBoxProps) => {
  return (
    <View marginB-10>
      <SubTitle title={title} />
      {data.map(({ id, value }) => (
        <View style={styles.inputRow} flex row key={id}>
          <View flex-1>
            <Text>{value}</Text>
          </View>
          <View flex-3>
            <TextInput
              scrollEnabled={false}
              placeholder={editable ? '입력하세요' : ''}
              underlineColorAndroid="transparent"
              onChangeText={editable && onChangeNote ? value => onChangeNote({ [inputType]: { ...inputValue, [id]: value } }) : () => null}
              value={inputValue && inputValue[id]}
              placeholderTextColor={Constant.PLACEHOLDER_COLOR}
              multiline
              editable={editable}
            />
          </View>
        </View>
      ))}
    </View>
  );
});

export default SelectInputBox;

const styles = StyleSheet.create({
  inputRow: {
    borderRadius: 2,
    backgroundColor: Constant.WHITE_COLOR,
    padding: 10,
    marginVertical: 5,
    elevation: 5,
    shadowColor: Constant.SHADOW_COLOR,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});