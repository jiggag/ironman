import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { LineChart, LineChartData } from 'react-native-chart-kit';
import { DynamicStyleSheet, DynamicValue, useDynamicValue } from 'react-native-dynamic';
import styled from 'styled-components/native';
import { Color, Theme } from '@utils/constants';

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

export const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const styles = useDynamicValue(dynamicStyles);
  const backgroundColor = useDynamicValue(Theme.light.background, Theme.dark.background);

  return (
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
            backgroundGradientFrom: backgroundColor,
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: backgroundColor,
            backgroundGradientToOpacity: 0,
            color: () => Color.blue,
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
};

const dynamicStyles = new DynamicStyleSheet({
  chart: {
    paddingRight: 10,
    paddingTop: 10,
  },
  wrapper: {
    backgroundColor: new DynamicValue(Theme.light.background, Theme.dark.background),
    borderRadius: 2,
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 0,
    shadowColor: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
const EmptyWrapper = styled.View`
  height: 100px;
  justify-content: center;
  align-items: center;
`;
