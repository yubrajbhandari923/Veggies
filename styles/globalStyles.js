import {StyleSheet} from 'react-native';
import {theme} from '../core/theme';

export const buttonStyles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontSize: theme.fonts.size.medium,

    lineHeight: 26,
    fontFamily: theme.fonts.family.light1,
  },
  outlined: {
    backgroundColor: theme.colors.surface,
  },
});

export const headerStyles = StyleSheet.create({
  header: {
    fontSize: theme.fonts.size.large,
    color: theme.colors.primary,
    paddingVertical: 12,
    fontFamily: theme.fonts.family.bold2,
  },
});
export const logoStyles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 8,
  },
});

// This is the style for the snackbar where message will be displayed
export const SnackBarStyles = StyleSheet.create({
  snackbarStyle: {
    paddingVertical: 15,
    borderRadius: 18,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontFamily: theme.fonts.family.medium2,
    fontSize: theme.fonts.size.medium,
    color: theme.colors.white,
    marginLeft: 10,
    width: 250,
    height: '100%',
  },
  snackBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 40,
    width: 40,
  },

  dismiss: {
    fontSize: theme.fonts.size.regular,
    fontFamily: theme.fonts.family.light2,
    color: theme.colors.white,
  },
});

export const inputStyles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.primary,
    fontFamily: theme.fonts.family.bold1, 
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.errorText,
    paddingTop: 8,
  },
  initialContainer: {
    alignItems: 'center',
    // height: '100%',
    // justifyContent: 'center',
    // paddingHorizontal: 5,
    backgroundColor: 'green',
    width: 100,
    height: '100%',
    alignSelf: 'flex-start',
  },
  initialText: {
    color: '#ccc',
    fontSize: theme.fonts.size.medium,
    fontFamily: theme.fonts.family.bold1,
  },
});

export const HeaderBackButtonStyles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  icon: {
    color: theme.colors.primary,
  },
  text: {
    marginLeft: 3,
    color: theme.colors.primary,
    fontFamily: theme.fonts.family.light2,
    fontSize: theme.fonts.size.regular,
  },
});
