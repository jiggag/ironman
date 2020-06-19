import React from 'react';
import { render } from '@testing-library/react-native';
import SubTitle from '../../src/components/SubTitle';

it('Renderer Component: SubTitle', () => {
  const { baseElement } = render(
    <SubTitle title="서브타이틀" />
  )
  expect(baseElement).toMatchSnapshot();
});