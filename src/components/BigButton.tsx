import React, { useMemo } from 'react';
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
}) => {
  const customButtonStyle = useMemo<StyleProp<ViewStyle>>(() => [styles.button, buttonStyle], [buttonStyle]);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={customButtonStyle}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

export default BigButton;

export const MainBigButton: React.FC<ButtonProps> = ({ text, onPress }) => {
  return <BigButton text={text} onPress={onPress} buttonStyle={styles.mainButton} textStyle={styles.mainButtonText} />;
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Constant.MAIN_COLOR,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 2,
    elevation: 4,
    shadowColor: Constant.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  buttonText: {
    color: Constant.WHITE_COLOR,
    fontWeight: '600',
    fontSize: 16,
  },
  mainButton: {
    backgroundColor: Constant.MAIN_COLOR,
    borderWidth: 0,
    paddingVertical: 20,
    borderRadius: 2,
  },
  mainButtonText: {
    fontWeight: 'bold',
    color: Constant.WHITE_COLOR,
  },
});
