import React, { memo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { BackButton } from '@components/header/BackButton';
import Constant, { FontSize, FontWeight } from '@utils/constants';
import { RootReducer } from '../../types';
import { HeaderRightButton } from './HeaderRightButton';

interface HeaderType {
  onPress: () => void;
  onPressRightButton?: () => void;
  onPressDelete?: () => void;
  type?: string;
}

export enum BUTTON_TYPE {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  SAVE = 'SAVE',
  SEND = 'SEND',
}

const BUTTON_TEXT = {
  CREATE: '생성',
  UPDATE: '수정',
  SAVE: '저장',
  SEND: '보내기',
};

export const Header = memo<HeaderType>(({
  onPress, onPressRightButton, onPressDelete, type,
}) => {
  const { auth } = useSelector((store: RootReducer) => store.user);
  const navigation = useNavigation();

  const onPressVoc = useCallback(() => {
    navigation.navigate(auth === 'ADMIN' ? 'ListVoc' : 'SendVoc');
  }, [auth, navigation]);

  return (
    <View row centerV paddingH-20 style={styles.header}>
      <BackButton onPress={onPress} />
      <HeaderRightButton isVisible buttonIdx={2} text="문의" onPress={onPressVoc} style={styles.deleteButtonText} />
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
        text={BUTTON_TEXT[type as string]}
        onPress={onPressRightButton}
        style={styles.buttonText}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  buttonText: {
    color: Constant.SHADOW_COLOR,
    fontSize: FontSize.normal,
    fontWeight: FontWeight.bold,
    paddingHorizontal: 10,
  },
  deleteButtonText: {
    color: Constant.WARN_COLOR,
    fontSize: FontSize.normal,
    fontWeight: FontWeight.bold,
    paddingHorizontal: 10,
  },
  header: {
    backgroundColor: Constant.WHITE_COLOR,
    elevation: 5,
    height: 50,
    marginBottom: 2,
    shadowColor: Constant.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
});
