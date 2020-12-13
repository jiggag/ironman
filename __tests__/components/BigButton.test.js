import React from 'react';
import renderer from 'react-test-renderer';
import BigButton from '../../src/components/BigButton';

it('Renderer Component: BigButton', () => {
  const onPress = mock.fn();
  const component = renderer.create(<BigButton onPress={onPress} text="버튼" />);
  let bigButton = component.toJSON();
  expect(bigButton).toMatchSnapshot();
});
