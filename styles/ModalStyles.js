import {StyleSheet} from 'react-native';
import {theme} from '../core/theme';

export const ModalLayoutStyles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '70%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    bottom: 0,
    position: 'absolute',
  },
  smallBar: {
    height: 4,
    width: 90,
    backgroundColor: '#1b7a59e0',
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

const ModalStyle = StyleSheet.create({
  title: {
    fontFamily: theme.fonts.family.medium2,
    fontSize: theme.fonts.size.large,
    color: theme.colors.primary,
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 10,
    width: '100%',
  },
});

export const UserUpdateStyles = StyleSheet.create({
  ...ModalStyle,
});

export const AddressUpdateStyles = StyleSheet.create({
  ...ModalStyle,
  icon: {resizeMode: 'contain', height: 25, width: 25},
});
