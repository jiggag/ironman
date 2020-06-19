import React from 'react';
import { render } from '@testing-library/react-native';
import LineGraph from '../../src/components/LineGraph';

it('Renderer Component: SubTitle', () => {
  const { baseElement, rerender } = render(
    <LineGraph data={[1,3,2,3,1,2,4,1,2,3,2,3,1]} />
  )
  expect(baseElement).toMatchSnapshot();

  rerender(
    <LineGraph data={[1,3,2]} />
  )
  expect(baseElement).toMatchSnapshot();

  rerender(
    <LineGraph data={[]} />
  )
  expect(baseElement).toMatchSnapshot();
});