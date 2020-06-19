import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';
import Header from '../../src/components/Header';

it('Renderer Component: Header', () => {
  const store = {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: () => ({
      user: {
        auth: 'ADMIN',
      },
    }),
  };
  const { baseElement, rerender } = render(
    <Provider store={store}>
      <Header onPress={jest.fn()} onPressRightButton={jest.fn()} type="CREATE" />
    </Provider>
  );
  expect(baseElement).toMatchSnapshot();

  rerender(
    <Provider store={store}>
      <Header onPress={jest.fn()} onPressRightButton={jest.fn()} onPressDelete={jest.fn()} type="UPDATE" />
    </Provider>
  );
  expect(baseElement).toMatchSnapshot();
});
