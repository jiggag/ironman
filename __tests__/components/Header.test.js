import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BUTTON_TYPE, Header } from '../../src/components/header/Header';

it('Renderer Component: Header', () => {
  const store = {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    getState: () => ({
      user: jest.fn(),
    }),
  };

  const createComponent = renderer.create(
    <Provider store={store}>
      <Header onPress={jest.fn()} onPressRightButton={jest.fn()} type={BUTTON_TYPE.CREATE} />
    </Provider>
  );
  let createHeader = createComponent.toJSON();
  expect(createHeader).toMatchSnapshot();

  const updateComponent = renderer.create(
    <Provider store={store}>
      <Header onPress={jest.fn()} onPressRightButton={jest.fn()} onPressDelete={jest.fn()} type={BUTTON_TYPE.UPDATE} />
    </Provider>
  );
  let updateHeader = updateComponent.toJSON();
  expect(updateHeader).toMatchSnapshot();
});
