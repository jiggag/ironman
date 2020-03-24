import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { BigButton } from '../../components';
import styles from './styles';

const Presenter = ({ onPress }) => (
  <View style={{ flex: 1, justifyContent: 'flex-end' }}>
    <BigButton onPress={onPress} text="시작하기" buttonStyle={null} />
    <View style={styles.join}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
        <Text style={styles.joinText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Presenter;

Presenter.defaultProps = {
  onPress: () => {},
};
Presenter.propTypes = {
  onPress: PropTypes.func,
};
