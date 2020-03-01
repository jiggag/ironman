import React from 'react';
import renderer from 'react-test-renderer';
import BigButton from '../../src/components/BigButton';

it('Renderer Component: BigButton', () => {
  const component = renderer.create(
    <BigButton onPress={() => {}} text="버튼" buttonStyle={{
      backgroundColor: '#ffffff'
    }} />
  )
  let bigButton = component.toJSON();
  expect(bigButton).toMatchSnapshot();
});