import React from 'react';
import renderer from 'react-test-renderer';
import RadioButton from '../../src/components/RadioButton';

it('Renderer Component: RadioButton', () => {
  const component = renderer.create(<RadioButton onPress={jest.fn()} value="라디오버튼" isSelected />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('Renderer Component: RadioButton Unselected', () => {
  const component2 = renderer.create(<RadioButton onPress={jest.fn()} value="라디오버튼" isSelected={false} />);
  expect(component2.toJSON()).toMatchSnapshot();
});
