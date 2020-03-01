import React from 'react';
import { Dimensions, Text } from 'react-native';
import { LineChart, LineChartData } from 'react-native-chart-kit';
import styled from 'styled-components/native';
import Constant from '../utils/constants';

const formatData = (data: number[]): LineChartData => ({
  labels: [],
  datasets: [
    {
      data,
    }
  ],
});

const EmptyData = () => {
  return (
    <EmptyWrapper>
      <Text>...</Text>
    </EmptyWrapper>
  )
}
const LineGraph = ({ data }) => (
  <Wrapper>
    {data.length ? (
      <LineChart
        style={{
          paddingTop: 10,
          paddingRight: 10,
        }}
        data={formatData(data)}
        width={Dimensions.get('screen').width - (data.length > 10 ? 40 : 15)}
        height={100}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLabels={false}
        withHorizontalLabels={false}
        chartConfig={{
          backgroundGradientFrom: Constant.WHITE_COLOR,
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: Constant.WHITE_COLOR,
          backgroundGradientToOpacity: 0,
          color: () => Constant.MAIN_COLOR,
          barPercentage: 0,
        }}
      />
    ) : <EmptyData />}
  </Wrapper>
);

export default LineGraph;

const Wrapper = styled.View`
  margin: 0 20px;
  border: 1px solid ${Constant.MAIN_COLOR};
`;
const EmptyWrapper = styled.View`
  height: 100px;
  justify-content: center;
  align-items: center;
`;