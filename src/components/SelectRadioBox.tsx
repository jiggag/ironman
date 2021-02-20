import React, { memo } from 'react';
import { View } from 'react-native-ui-lib';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
// eslint-disable-next-line import/no-cycle
import { RadioButton, SubTitle } from './index';

interface SelectRadioBoxProps {
  data: {
    id: number;
    value: string;
    visible: boolean;
  }[];
  onChangeNote: (param: Record<string, number>) => void;
  inputValue: number;
  inputType: string;
  title: string;
}
const SelectRadioBox = memo(({
  title, data, onChangeNote, inputValue, inputType,
}: SelectRadioBoxProps) => {
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

export default SelectRadioBox;
