import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../src/components/Header';

it('Renderer Component: Header', () => {
  const createComponent = renderer.create(<Header onPress={jest.fn()} onPressRightButton={jest.fn()} type="CREATE" />);
  let createHeader = createComponent.toJSON();
  expect(createHeader).toMatchSnapshot();

  const updateComponent = renderer.create(
    <Header onPress={jest.fn()} onPressRightButton={jest.fn()} onPressDelete={jest.fn()} type="UPDATE" />
  );
  let updateHeader = updateComponent.toJSON();
  expect(updateHeader).toMatchSnapshot();
});
