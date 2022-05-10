import {DefaultTheme, configureFonts} from 'react-native-paper';

const fontConfig = {
  regular: {
    fontFamily: 'Poppins-Medium',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'normal',
  },
  light: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'normal',
  },
  thin: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'normal',
  },

  family: {
    bold1: 'Montserrat-Bold',
    bold2: 'Poppins-Bold',

    light1: 'Montserrat-Regular',
    light2: 'Poppins-Regular',

    medium1: 'Montserrat-Medium',
    medium2: 'Poppins-Medium',
  },

  size: {
    large: 27,

    big: 20,

    medium: 16,

    regular: 14,

    small: 12,
  },
};

export const theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    surface: '#fff',

    text: '#444',

    background: '#fff',

    placeholder: '#45b182',

    primary: '#2bc48a',

    secondary: '#ccc',

    border: '#ccc',

    white: '#fff',

    grey: '#999',

    error: '#772121',

    success: '#297558',

    errorText: '#f13a59',
  },
  fonts: fontConfig,
};
