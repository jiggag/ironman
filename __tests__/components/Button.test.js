import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../../src/components/Button';

it('Renderer Component: Button', () => {
  const component = renderer.create(
    <Button onPress={() => {}} text="버튼" buttonStyle={{
      backgroundColor: '#ffffff'
    }} />
  )
  let button = component.toJSON();
  expect(button).toMatchSnapshot();
});