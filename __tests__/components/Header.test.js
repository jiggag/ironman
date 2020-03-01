import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../src/components/Header';

it('Renderer Component: Header', () => {
  const component = renderer.create(
    <Header onPress={() => {}} onPressRightButton={() => {}} type="CREATE" />
  )
  let header = component.toJSON();
  expect(header).toMatchSnapshot();
});