import {DefaultTheme, configureFonts} from 'react-native-paper';

const fontConfig = {
  android: {
    regular: {
      fontFamily: 'Nunito-Medium',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Nunito-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Nunito-Medium',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Nunito-Medium',
      fontWeight: 'normal',
    },
  },
};

export const theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    surface: '#fff',
    error: '#f13a59',
    placeholder: '#45b182',
    accent: 'blue',
    disabled: 'red',
    primary: '#45b182',
    text: '#555',
    background: '#fff',
    secondary: '#00b386',
    card: '#00b386',
    onSurface: 'green',
    notification: 'red',
  },
  fonts: configureFonts(fontConfig),
};
