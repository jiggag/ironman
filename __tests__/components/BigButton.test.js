import React from 'react';
import renderer from 'react-test-renderer';
import BigButton, { MainBigButton } from '../../src/components/BigButton';

it('Renderer Component: BigButton', () => {
  const component = renderer.create(<BigButton onPress={jest.fn()} text="버튼" />);
  let bigButton = component.toJSON();
  expect(bigButton).toMatchSnapshot();
});

it('스냅샷 테스트: MainBigButton', () => {
  const mainBigButton = renderer.create(<MainBigButton onPress={jest.fn()} text="시작하기" />).toJSON();
  expect(mainBigButton).toMatchSnapshot();
})
