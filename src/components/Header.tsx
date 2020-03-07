import React, { memo } from 'react';
import { View } from 'react-native-ui-lib';
import { Text, TouchableOpacity, StyleSheet, StyleProp, TextStyle } from 'react-native';
import Constant from '../utils/constants';

interface HeaderRightButtonType {
  isVisible: boolean;
  buttonIdx: number;
  text: string;
  onPress: () => void;
  style: StyleProp<TextStyle>;
}

const TYPE = {
  CREATE: '생성',
  UPDATE: '수정',
  SAVE: '저장',
};

const HeaderRightButton = memo(({ isVisible, buttonIdx, text, onPress, style }: HeaderRightButtonType) => {
  return (
    isVisible && (
      <View right centerV marginR-10={!!buttonIdx}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <View paddingV-4 paddingH-6>
            <Text style={style}>{text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  );
});

const Header = ({ onPress, onPressRightButton, onPressDelete = () => {}, type }) => (
  <View row style={styles.header}>
    <View flex left>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View paddingV-2>
          <Text style={styles.backButtonText}>뒤로가기</Text>
        </View>
      </TouchableOpacity>
    </View>
    <HeaderRightButton
      isVisible={type === 'UPDATE'}
      buttonIdx={1}
      text="삭제"
      onPress={onPressDelete}
      style={styles.deleteButtonText}
    />
    <HeaderRightButton
      isVisible
      buttonIdx={0}
      text={TYPE[type]}
      onPress={onPressRightButton}
      style={styles.backButtonText}
    />
  </View>
);

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Constant.WHITE_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: Constant.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    marginBottom: 2,
  },
  backButtonText: {
    color: Constant.SHADOW_COLOR,
    fontWeight: '600',
    fontSize: 14,
  },
  deleteButtonText: {
    color: Constant.WARN_COLOR,
    fontWeight: '600',
    fontSize: 14,
  },
});
