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
          labelColor: () => Constant.WHITE_COLOR,
          barPercentage: 0,
        }}
      />
    ) : <EmptyData />}
  </Wrapper>
);

export default LineGraph;

const Wrapper = styled.View`
  margin: 0 20px;
  border-radius: 6;
  border: 1px solid ${Constant.MAIN_COLOR};
  background-color: ${Constant.WHITE_COLOR};
  elevation: 5;
  shadow-color: ${Constant.SHADOW_COLOR};
  shadow-offset: {
    width: 6,
    height: 4,
  };
  shadow-opacity: 0.2;
  shadow-radius: 6;
`;
const EmptyWrapper = styled.View`
  height: 100px;
  justify-content: center;
  align-items: center;
`;