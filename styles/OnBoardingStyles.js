import {StyleSheet} from 'react-native';

export const OnBoardStyles = colors =>
  StyleSheet.create({
    onBoardTitleStyle: {
      fontSize: 30,
      fontFamily: 'Nunito-Medium',
      color: '#222',
      marginBottom: -10,
    },
    onBoardSubTitleStyle: {
      fontFamily: 'Nunito-Medium',
      fontSize: 17,
      marginBottom: 70,
    },
    buttonStyle: {
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttonText: {
      color: '#333',
      fontFamily: 'Nunito-Medium',
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
