import React from 'react';
import {
  Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle,
} from 'react-native';
import Constant from '../utils/constants';

interface ButtonProps {
  onPress: () => void;
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
const BigButton: React.FC<ButtonProps> = ({
  onPress, text, buttonStyle, textStyle,
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={[styles.button, buttonStyle]}>
    <Text style={[styles.buttonText, textStyle]}>{text}</Text>
  </TouchableOpacity>
);

export default BigButton;

export const YellowButton = ({ text, onPress }) => {
  return <BigButton text={text} onPress={onPress} buttonStyle={styles.yellowButton} textStyle={styles.yellowButtonText} />;
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Constant.MAIN_COLOR,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 6,
    elevation: 2,
    shadowColor: Constant.SHADOW_COLOR,
    shadowOffset: {
      width: 6,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: Constant.WHITE_COLOR,
    fontWeight: '600',
    fontSize: 16,
  },
  yellowButton: {
    backgroundColor: Constant.WHITE_COLOR,
    borderWidth: 2,
    borderColor: Constant.MAIN_COLOR,
    paddingVertical: 20,
  },
  yellowButtonText: {
    color: Constant.MAIN_COLOR,
  },
});
