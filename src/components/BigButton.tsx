import React, { useMemo } from 'react';
import {
  Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle,
} from 'react-native';
import Constant from '@utils/constants';

interface ButtonProps {
  onPress: () => void;
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
export const BigButton: React.FC<ButtonProps> = ({
  onPress, text, buttonStyle, textStyle,
}) => {
  const customButtonStyle = useMemo<StyleProp<ViewStyle>>(() => [styles.button, buttonStyle], [buttonStyle]);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={customButtonStyle}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export const MainBigButton: React.FC<ButtonProps> = ({ text, onPress }) => {
  return <BigButton text={text} onPress={onPress} buttonStyle={styles.mainButton} textStyle={styles.mainButtonText} />;
};

export const TextLineButton: React.FC<ButtonProps> = ({ text, onPress }) => {
  return (
    <BigButton
      text={text}
      onPress={onPress}
      buttonStyle={styles.textLineButton}
      textStyle={styles.textLineButtonText}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Constant.MAIN_COLOR,
    borderRadius: 2,
    elevation: 4,
    marginHorizontal: 20,
    marginVertical: 8,
    paddingVertical: 14,
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
    fontSize: 16,
    fontWeight: '600',
  },
  mainButton: {
    backgroundColor: Constant.MAIN_COLOR,
    borderRadius: 2,
    borderWidth: 0,
    paddingVertical: 20,
  },
  mainButtonText: {
    color: Constant.WHITE_COLOR,
    fontWeight: 'bold',
  },
  textLineButton: {
    backgroundColor: Constant.WHITE_COLOR,
    elevation: 0,
    paddingVertical: 20,
    shadowOpacity: 0,
  },
  textLineButtonText: {
    color: Constant.MAIN_COLOR,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
