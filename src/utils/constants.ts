import { Platform } from 'react-native';

const Constant = {
  MAIN_COLOR: '#209EFF',
  SUB_COLOR: '#eee',
  HIGHLIGHT_SUB_COLOR: '#ddd',
  WHITE_COLOR: '#ffffff',
  PLACEHOLDER_COLOR: '#c9d6e3',
  SHADOW_COLOR: '#333333',
  WARN_COLOR: '#e34d10',
  BLACK: '#000000',
  OPACITY_COLOR: '#00000032',
};

export default Constant;

export const Color = {
  white: '#F2F2F2',
  black: '#333333',
  blue: '#2F80ED',
  red: '#EB5757',
  gray: '#BDBDBD',
};

export const Theme = {
  light: {
    base: Color.blue,
    text: Color.white,
    main: Color.red,
    sub: Color.red,
    option: Color.gray,
  },
  dark: {
    base: Color.black,
    text: Color.white,
    main: Color.blue,
    sub: Color.red,
    option: Color.gray,
  },
};

export const FontSize = {
  title: 36,
  button: 18,
  normal: 14,
  small: 10,
};

export const FontStyle = {
  normal: 'normal',
  italic: 'italic',
} as const;

export const FontWeight = {
  bold: 'bold',
  normal: 'normal',
  light: Platform.select({
    ios: '200',
    android: 'normal',
  }),
} as const;

export const DefaultFontStyle = {
  fontSize: FontSize.normal,
  fontStyle: FontStyle.normal,
  fontWeight: FontWeight.normal,
  includeFontPadding: false,
};
