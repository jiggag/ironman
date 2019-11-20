import React from 'react';
import { View } from 'react-native';
import { BigButton } from '../../components';
import { kakaoType } from './Container';

const Presenter = ({ onPress }) => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <BigButton
      onPress={() => onPress(kakaoType.LOGIN)}
      text={'카카오 로그인'}
      buttonStyle={null}
    />
    <BigButton
      onPress={() => onPress(kakaoType.JOIN)}
      text={'카카오 회원가입'}
      buttonStyle={null}
    />
  </View>
);

export default Presenter;
