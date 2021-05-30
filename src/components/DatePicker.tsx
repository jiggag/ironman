import React, { memo, useCallback, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { View } from 'react-native-ui-lib';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { BigButton } from '@components/button/BigButton';
import Constant from '@utils/constants';

interface DatePickerProps {
  onChangeDate: (date: Date) => void;
  date: number;
}

export const DatePicker = memo<DatePickerProps>(({ onChangeDate, date }) => {
  const [isShowPicker, setIsShowPicker] = useState<boolean>(false);

  const onPress = useCallback(() => {
    setIsShowPicker((prev) => !prev);
  }, []);

  const onChange = useCallback(
    (e, date) => {
      onChangeDate(date);
    },
    [onChangeDate],
  );

  return (
    <>
      <BigButton
        onPress={onPress}
        text={moment(date).format('YYYY.MM.DD')}
        buttonStyle={styles.dateDisplay}
        textStyle={styles.dateText}
      />
      {isShowPicker && (
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
      )}
    </>
  );
});

const styles = StyleSheet.create({
  dateDisplay: {
    backgroundColor: Constant.WHITE_COLOR,
    borderBottomWidth: 1,
    marginHorizontal: 0,
    marginVertical: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    shadowOpacity: 0,
  },
  datePicker: {
    backgroundColor: Constant.WHITE_COLOR,
  },
  dateText: {
    color: Constant.BLACK,
    fontSize: 18,
    fontWeight: '600',
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
