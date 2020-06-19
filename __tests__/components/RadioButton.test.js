import React from 'react';
import { render } from '@testing-library/react-native';
import RadioButton from '../../src/components/RadioButton';

it('Renderer Component: RadioButton', () => {
  const { baseElement } = render(
    <RadioButton onPress={jest.fn()} value="라디오버튼" isSelected />
  )
  expect(baseElement).toMatchSnapshot();
});