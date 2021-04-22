import React, { memo } from 'react';
import { Text, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import _constant from 'lodash/constant';
import _map from 'lodash/map';
import Constant from '@utils/constants';
import { SubTitle } from './SubTitle';
import { TextInput } from './TextInput';

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
export const SelectInputBox = memo<SelectInputBoxProps>(
  ({
    title, data, onChangeNote, inputValue, inputType, editable = true,
  }) => {
    return (
      <View marginB-10>
        <SubTitle title={title} />
        {_map(data, ({ id, value }) => (
          <View style={styles.inputRow} flex row key={id}>
            <View flex-1>
              <Text style={styles.itemTitle}>{value}</Text>
            </View>
            <View flex-3>
              <TextInput
                scrollEnabled={false}
                placeholder={editable ? '입력하세요' : ''}
                underlineColorAndroid="transparent"
                onChangeText={
                  editable && onChangeNote
                    ? (value) => onChangeNote({ [inputType]: { ...inputValue, [id]: value } })
                    : _constant(null)
                }
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
  },
);

const styles = StyleSheet.create({
  inputRow: {
    backgroundColor: Constant.WHITE_COLOR,
    borderRadius: 2,
    elevation: 5,
    marginVertical: 5,
    padding: 10,
    shadowColor: Constant.SHADOW_COLOR,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  itemTitle: {
    color: Constant.BLACK,
  },
});
