import React, { memo } from 'react';
import { View } from 'react-native-ui-lib';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import { RadioData } from '../types';
import { RadioButton } from './RadioButton';
import { SubTitle } from './SubTitle';

interface SelectRadioBoxProps {
  data: RadioData[];
  onChangeNote: (param: Record<string, number>) => void;
  inputValue: number;
  inputType: string;
  title: string;
}
export const SelectRadioBox = memo<SelectRadioBoxProps>(({
  title, data, onChangeNote, inputValue, inputType,
}) => {
  return (
    <View marginB-10>
      <SubTitle title={title} />
      <View flex row>
        {_map(
          _filter(data, ({ visible }) => visible),
          ({ id, value }) => (
            <View flex left key={id}>
              <RadioButton
                onPress={() => onChangeNote({ [inputType]: id })}
                value={value}
                isSelected={inputValue === id}
              />
            </View>
          ),
        )}
      </View>
    </View>
  );
});
