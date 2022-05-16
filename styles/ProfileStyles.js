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
  edit: {position: 'absolute', right: 20, zIndex: 5, top: 10},
  editText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.family.light2,
    fontSize: theme.fonts.size.small,
  },
});

export const EditProfileStyle = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleIcon: {marginRight: 10},
  title: {
    fontFamily: theme.fonts.family.bold2,
    fontSize: theme.fonts.size.large,
    color: theme.colors.primary,
  },
  pictureEditor: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    minHeight: 200,
  },
  profileText: {
    fontFamily: theme.fonts.family.medium2,
    marginTop: 10,
    fontSize: theme.fonts.size.medium,
    color: theme.colors.grey,
  },
  imageContainer: {
    borderRadius: 40,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: 125,
    height: 125,
    resizeMode: 'cover',
    backgroundColor: '#fff',
  },
  editTabsContainer: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    minHeight: 80,
    borderRadius: 30,
    alignContent: 'center',
  },
  editTabText: {
    justifyContent: 'space-around',
  },
  name: {
    fontFamily: theme.fonts.family.medium2,
    fontSize: theme.fonts.size.medium,
    letterSpacing: 1,
    color: theme.colors.grey,
  },
  actualName: {
    fontFamily: theme.fonts.family.light1,
    fontSize: theme.fonts.size.small,
    letterSpacing: 1,
    color: theme.colors.grey,
  },
  iconContainer: {
    alignSelf: 'center',
    right: 10,
    position: 'absolute',
  },
  verified: {
    color: '#1b7a59e0',
    fontSize: theme.fonts.size.small,
    fontFamily: theme.fonts.family.light1,
  },
  unverified: {
    color: '#da3633',
    fontSize: theme.fonts.size.small,
    fontFamily: theme.fonts.family.light1,
  },
});
