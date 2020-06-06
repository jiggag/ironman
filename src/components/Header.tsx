import React, { memo, useCallback } from 'react';
import { View } from 'react-native-ui-lib';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Constant from '../utils/constants';
import HeaderRightButton from './HeaderRightButton';

interface HeaderType {
  onPress: () => void;
  onPressRightButton?: () => void;
  onPressDelete?: () => void;
  type?: string;
}

const TYPE = {
  CREATE: '생성',
  UPDATE: '수정',
  SAVE: '저장',
  SEND: '보내기'
};

const Header = memo(({
  onPress, onPressRightButton, onPressDelete, type,
}: HeaderType) => {
  const navigation = useNavigation();
  const { auth } = useSelector(store => store.user);
  const onPressVoc = useCallback(() => {
    navigation.navigate(auth === "ADMIN" ? "ListVoc" : "SendVoc")
  }, []);
  
  return (
    <View row style={styles.header}>
      <View flex left>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <View paddingV-2>
            <Text style={styles.backButtonText}>뒤로가기</Text>
          </View>
        </TouchableOpacity>
      </View>
      <HeaderRightButton
        isVisible
        buttonIdx={2}
        text="문의"
        onPress={onPressVoc}
        style={styles.deleteButtonText}
      />
      <HeaderRightButton
        isVisible={type === 'UPDATE'}
        buttonIdx={1}
        text="삭제"
        onPress={onPressDelete}
        style={styles.deleteButtonText}
      />
      <HeaderRightButton
        isVisible={!!type}
        buttonIdx={0}
        text={TYPE[type]}
        onPress={onPressRightButton}
        style={styles.backButtonText}
      />
    </View>
  )
});

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
