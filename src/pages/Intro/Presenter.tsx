import React, { memo } from 'react';
import { View } from 'react-native';
import { MainBigButton } from '@components/BigButton';
import styles from './styles';

interface Intro {
  onPress: () => void;
}
const Presenter = memo<Intro>(({ onPress }) => (
  <View style={styles.wrapper}>
    <MainBigButton onPress={onPress} text="시작하기" />
  </View>
));

export default Presenter;
