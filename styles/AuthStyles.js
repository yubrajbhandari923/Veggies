import {StyleSheet} from 'react-native';
import {theme} from '../core/theme';

export const switchModeStyles = StyleSheet.create({
  switchContainer: {
    alignSelf: 'flex-end',
    top: 20,
    position: 'absolute',
    alignItems: 'center',
  },
  switchImage: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  switchText: {
    fontFamily: theme.fonts.family.medium2,
    fontSize: theme.fonts.size.small,
    color: theme.colors.grey,
    marginTop: 5,
  },
});
export const loginScreenStyles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  forgot: {
    fontSize: theme.fonts.size.small,
    color: theme.colors.primary,
    fontFamily: theme.fonts.family.light2,
  },
  link: {
    color: theme.colors.primary,
    fontSize: theme.fonts.size.medium,
    marginLeft: 10,
    fontFamily: theme.fonts.family.light2,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  socialButton: {
    width: 145,
    height: 50,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 7,
  },
  socialIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  instead: {
    fontSize: theme.fonts.size.regular,
    color: theme.colors.grey,
    fontFamily: theme.fonts.family.light2,
  },
});

export const backgroundStyles = StyleSheet.create({
  background: {
    // flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const forgotPasswordStyles = StyleSheet.create({
  row: loginScreenStyles.row,
  instead: loginScreenStyles.instead,
  link: loginScreenStyles.link,
});

export const registerStyles = StyleSheet.create({
  row: loginScreenStyles.row,
  link: loginScreenStyles.link,
  instead: loginScreenStyles.instead,
});
