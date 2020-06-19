import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../src/App';

const testCreateStack = screen => {
  return {
    screen,
    navigationOptions: {
      header: null,
    },
  }
};

it('Create Navigation Stack Object', () => {
  expect(testCreateStack('Intro')).toMatchObject({
    screen: 'Intro',
    navigationOptions: {
      header: null,
    },
  });
});

it('examples of some things', () => {
  const { baseElement } = render(<App />);

  expect(baseElement).toMatchSnapshot();
});