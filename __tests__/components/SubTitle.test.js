import React from 'react';
import renderer from 'react-test-renderer';
import SubTitle from '../../src/components/SubTitle';

it('Renderer Component: SubTitle', () => {
  const component = renderer.create(
    <SubTitle title="서브타이틀" />
  )
  let subTitle = component.toJSON();
  expect(subTitle).toMatchSnapshot();
});