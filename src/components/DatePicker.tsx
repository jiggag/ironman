import React, { memo, useCallback, useState } from 'react';
import { TouchableWithoutFeedback, Dimensions, Platform } from 'react-native';
import { View } from 'react-native-ui-lib';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import moment from 'moment';
import { DynamicStyleSheet, DynamicValue, useDynamicValue } from 'react-native-dynamic';
import { BigButton } from '@components/button/BigButton';
import Constant, { FontSize, FontWeight, Theme } from '@utils/constants';

interface DatePickerProps {
  onChangeDate: (date: Date) => void;
  setScrollEnabled: (enable: boolean) => void;
  date: number;
}

export const DatePicker = memo<DatePickerProps>(({ onChangeDate, date, setScrollEnabled }) => {
  const [isShowPicker, setIsShowPicker] = useState<boolean>(false);

  const styles = useDynamicValue(dynamicStyles);

  const onPress = useCallback(() => {
    setIsShowPicker((prev) => {
      const next = !prev;
      setScrollEnabled(!next);
      return next;
    });
  }, [setScrollEnabled]);

  const onChange = useCallback(
    (e: Event, date) => {
      if (date) {
        onChangeDate(date);
      }
      onPress();
    },
    [onPress, onChangeDate],
  );

  return (
    <>
      <BigButton
        onPress={onPress}
        text={moment(date).format('YYYY.MM.DD')}
        buttonStyle={styles.dateDisplay}
        textStyle={styles.dateText}
      />
      {isShowPicker
        && (Platform.OS === 'ios' ? (
          <View style={styles.dateWrapper}>
            <TouchableWithoutFeedback onPress={onPress}>
              <View flex />
            </TouchableWithoutFeedback>
            <View flex style={styles.datePicker}>
              <DateTimePicker
                testID="dateTimePicker"
                value={moment(date).toDate()}
                mode="date"
                is24Hour={false}
                display="spinner"
                onChange={onChange}
              />
            </View>
          </View>
        ) : (
          <DateTimePicker
            testID="dateTimePicker"
            value={moment(date).toDate()}
            mode="date"
            is24Hour={false}
            onChange={onChange}
          />
        ))}
    </>
  );
});

const dynamicStyles = new DynamicStyleSheet({
  dateDisplay: {
    backgroundColor: new DynamicValue(Theme.light.background, Theme.dark.background),
    borderBottomWidth: 1,
    borderColor: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    marginHorizontal: 0,
    marginVertical: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  datePicker: {
    backgroundColor: new DynamicValue(Theme.light.background, Theme.dark.background),
  },
  dateText: {
    color: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    fontSize: FontSize.button,
    fontWeight: FontWeight.bold,
  },
  dateWrapper: {
    backgroundColor: Constant.OPACITY_COLOR,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    left: -20,
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
});
