import React from 'react';
import renderer from 'react-test-renderer';
import LineGraph from '../../src/components/LineGraph';

it('Renderer Component: SubTitle', () => {
  const component = renderer.create(
    <LineGraph data={[1,3,2,3,1,2,4,1,2,3,2,3,1]} />
  )
  let lineGraph = component.toJSON();
  expect(lineGraph).toMatchSnapshot();

  const component2 = renderer.create(
    <LineGraph data={[1,3,2]} />
  )
  let lineGraph2 = component2.toJSON();
  expect(lineGraph2).toMatchSnapshot();

  const emptyComponent = renderer.create(
    <LineGraph data={[]} />
  )
  let emptyLineGraph = emptyComponent.toJSON();
  expect(emptyLineGraph).toMatchSnapshot();
});