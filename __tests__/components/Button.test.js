import React from 'react';
import { render } from '@testing-library/react-native';
import Button from '../../src/components/Button';

it('Renderer Component: Button', () => {
  const { baseElement } = render(
    <Button onPress={() => {}} text="버튼" buttonStyle={{
      backgroundColor: '#ffffff'
    }} />
  )
  expect(baseElement).toMatchSnapshot();
});