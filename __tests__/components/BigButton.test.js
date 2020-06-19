import React from 'react';
import { render } from '@testing-library/react-native';
import BigButton from '../../src/components/BigButton';

it('Renderer Component: BigButton', () => {
  const { baseElement } = render(
    <BigButton onPress={() => {}} text="버튼" buttonStyle={{
      backgroundColor: '#ffffff'
    }} />
  )
  expect(baseElement).toMatchSnapshot();
});