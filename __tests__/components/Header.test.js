import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Header from '../../src/components/Header';

it('Renderer Component: Header', () => {
  const store = {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    getState: () => ({
      user: jest.fn(),
    })
  };
  
  const createComponent = renderer.create(
    <Provider store={store}>
      <Header onPress={jest.fn()} onPressRightButton={jest.fn()} type="CREATE" />
    </Provider>
  );
  let createHeader = createComponent.toJSON();
  expect(createHeader).toMatchSnapshot();

  const updateComponent = renderer.create(
    <Provider store={store}>
      <Header onPress={jest.fn()} onPressRightButton={jest.fn()} onPressDelete={jest.fn()} type="UPDATE" />
    </Provider>
  );
  let updateHeader = updateComponent.toJSON();
  expect(updateHeader).toMatchSnapshot();
});
