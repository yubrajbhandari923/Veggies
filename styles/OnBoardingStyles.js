import {StyleSheet} from 'react-native';
import {theme} from '../core/theme';

export const OnBoardStyles = colors =>
  StyleSheet.create({
    onBoardTitleStyle: {
      fontSize: 30,
      fontFamily: theme.fonts.family.bold2,
      color: theme.colors.grey,
      marginBottom: -10,
    },
    onBoardSubTitleStyle: {
      fontFamily: theme.fonts.family.medium2,
      fontSize: theme.fonts.size.medium,
      marginBottom: 70,
    },
    buttonStyle: {
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttonText: {
      color: theme.colors.grey,
      fontFamily: theme.fonts.family.light2,
      fontSize: 15,
      letterSpacing: 2,
      marginHorizontal: 5,
    },
    activeDot: {
      height: 5,
      width: 30,
      backgroundColor: colors.primary,
      borderRadius: 20,
      marginHorizontal: 5,
    },
    passiveDot: {
      height: 5,
      width: 10,
      backgroundColor: colors.primary,
      borderRadius: 20,
      marginHorizontal: 5,
    },
  });
