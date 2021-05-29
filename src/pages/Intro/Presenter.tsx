import React, { memo } from 'react';
import { Animated, ViewStyle } from 'react-native';
import Text from 'react-native-ui-lib/text';
import View from 'react-native-ui-lib/view';
import { TextLineButton } from '@components/BigButton';
import styles from './styles';

interface Intro {
  onPress: () => void;
  animatedStyle: Animated.WithAnimatedValue<ViewStyle>;
}
const Presenter = memo<Intro>(({ onPress, animatedStyle }) => (
  <View style={styles.wrapper}>
    <Text center style={styles.logo}>
      그러려니
    </Text>
    <Animated.View style={animatedStyle}>
      <TextLineButton onPress={onPress} text="시작하기" />
    </Animated.View>
  </View>
));

export default Presenter;
