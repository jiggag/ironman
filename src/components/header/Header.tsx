import React, { memo, useCallback } from 'react';
import { View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { DynamicStyleSheet, DynamicValue, useDynamicValue } from 'react-native-dynamic';
import { useSelector } from 'react-redux';
import { BackButton } from '@components/header/BackButton';
import { FontSize, FontWeight, Theme } from '@utils/constants';
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
  const styles = useDynamicValue(dynamicStyles);
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

const dynamicStyles = new DynamicStyleSheet({
  buttonText: {
    color: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    fontSize: FontSize.normal,
    fontWeight: FontWeight.bold,
    paddingHorizontal: 10,
  },
  deleteButtonText: {
    color: new DynamicValue(Theme.light.sub, Theme.dark.sub),
    fontSize: FontSize.normal,
    fontWeight: FontWeight.bold,
    paddingHorizontal: 10,
  },
  header: {
    backgroundColor: new DynamicValue(Theme.light.background, Theme.dark.background),
    elevation: 5,
    height: 50,
    marginBottom: 2,
    shadowColor: new DynamicValue(Theme.light.shadow, Theme.dark.shadow),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
});
