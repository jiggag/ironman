import React from 'react';
import {
  Dimensions, Text, View, StyleSheet,
} from 'react-native';
import { LineChart, LineChartData } from 'react-native-chart-kit';
import styled from 'styled-components/native';
import Constant from '../utils/constants';

const formatData = (data: number[]): LineChartData => ({
  labels: [],
  datasets: [
    {
      data,
    },
  ],
});

interface LineGraphProps {
  data: number[];
}
const LineGraph: React.FC<LineGraphProps> = ({ data }) => (
  <View style={styles.wrapper}>
    {data.length ? (
      <LineChart
        style={styles.chart}
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
    ) : (
      <EmptyWrapper>
        <Text>...</Text>
      </EmptyWrapper>
    )}
  </View>
);

export default LineGraph;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginVertical: 0,
    borderRadius: 2,
    backgroundColor: Constant.WHITE_COLOR,
    elevation: 5,
    shadowColor: Constant.SHADOW_COLOR,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  chart: {
    paddingTop: 10,
    paddingRight: 10,
  },
});
const EmptyWrapper = styled.View`
  height: 100px;
  justify-content: center;
  align-items: center;
`;
