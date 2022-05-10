import {StyleSheet} from 'react-native';
import {theme} from '../core/theme';
export const NewsFeedContainerStyles = StyleSheet.create({
  buttonContainer: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'center',
    elevation: 0.7,
    flex: 1,
    marginVertical: 30,
  },
  button: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  dishTitleContainer: {paddingVertical: 10},
  dishTitleText: {
    fontSize: theme.fonts.size.medium,
    fontFamily: theme.fonts.family.medium2,
  },
  dishDescriptionText: {
    fontSize: 14,
    fontFamily: theme.fonts.family.light2,
  },

  cartButtonContainer: {
    top: -10,
    right: -10,
    position: 'absolute',
    padding: 2,
    zIndex: 1,
  },
  cartIconButton: {
    height: 65,
    width: 65,
    backgroundColor: '#eeeeee6b',
    borderRadius: 30,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 135 / 76,
    resizeMode: 'cover',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  dishFeatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dishFeatureBox: {backgroundColor: '#eeeeee6b'},
  dishFeatureText: {
    fontFamily: theme.fonts.family.medium2,
    fontSize: 13,
    color: theme.colors.grey,
  },
});
export const SkeletonStyles = StyleSheet.create({
  buttonContainer: {
    maxHeight: 600,
    overflow: 'hidden',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  image: {
    borderRadius: 20,
    width: '100%',
    height: 200,
  },
  dishTitleContainer: {
    borderRadius: 6,
    marginTop: 8,
    height: 60,
    width: '100%',
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  features: {
    height: 24,
    width: 100,
    borderRadius: 20,
  },
});

export const NewsModalStyles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    // marginTop: '29%',
    paddingHorizontal: 20,
    // elevation: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // zIndex: 25,
    bottom: 0,

    position: 'absolute',
  },
  smallBar: {
    height: 4,
    width: 90,
    backgroundColor: '#1b7a59e0',
    borderRadius: 50,
    alignSelf: 'center',
  },
  webView: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginTop: 20,
  },
});
