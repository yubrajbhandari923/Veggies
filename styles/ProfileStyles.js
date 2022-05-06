import {StyleSheet} from 'react-native';
import {theme} from '../core/theme';

export const ProfileScreenStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  profileContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '20%',
    height: 150,
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 60,
    elevation: 1,
    zIndex: 5,
    overflow: 'hidden',
  },
  scrollContainer: {
    marginTop: '60%',
  },
  scrollContent: {
    // flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 80,
    paddingHorizontal: 15,
    // alignItems: 'center',
  },
  userImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageBackground: {
    height: 350,
    width: '100%',
    position: 'absolute',
  },
  username: {
    fontFamily: theme.fonts.family.medium2,
    fontSize: theme.fonts.size.large,
    color: theme.colors.grey,
    alignSelf: 'center',
    marginTop: 10,
  },
  phone: {
    color: theme.colors.grey,
    width: '100%',
    paddingVertical: 5,
    flexDirection: 'row',
  },
  detailText: {
    color: theme.colors.grey,
    marginLeft: 10,
  },
  someStats: {
    fontFamily: theme.fonts.family.light2,
    fontSize: 25,
    color: theme.colors.grey,
    textAlign: 'center',
  },
  functions: {paddingVertical: 15, flexDirection: 'row'},
  functionText: {
    fontFamily: theme.fonts.family.light2,
    fontSize: 16,
    color: theme.colors.grey,
    marginLeft: 10,
  },
  smallDetail: {
    fontSize: theme.fonts.size.small,
    color: theme.colors.grey,
    marginBottom: 10,
    fontFamily: theme.fonts.family.light2,
  },
});
