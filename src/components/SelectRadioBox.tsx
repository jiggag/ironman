import { View } from 'react-native-ui-lib';
import React, { memo } from 'react';
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
        {data.filter(({ visible }) => visible)
          .map(({ id, value }) => (
            <View flex left key={id}>
              <RadioButton
                onPress={() => onChangeNote({ [inputType]: id })}
                value={value}
                isSelected={inputValue === id}
              />
            </View>
          ))}
      </View>
    </View>
  );
});

export default SelectRadioBox;
