import {StyleSheet} from 'react-native';

// This is the style for the snackbar where message will be displayed
export const SnackBarStyles = StyleSheet.create({
  snackbarStyle: {
    paddingVertical: 15,
    color: 'black',
    borderRadius: 18,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    color: '#eee',
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
});
