import React from 'react';
import renderer from 'react-test-renderer';
import RadioButton from '../../src/components/RadioButton';

it('Renderer Component: RadioButton', () => {
  const component = renderer.create(
    <RadioButton onPress={jest.fn()} value="라디오버튼" isSelected />
  )
  let radioButton = component.toJSON();
  expect(radioButton).toMatchSnapshot();
});