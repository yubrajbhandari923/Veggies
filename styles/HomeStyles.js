import {StyleSheet} from 'react-native';
import {theme} from '../core/theme';
export const NewsFeedContainerStyles = StyleSheet.create({
  buttonContainer: {
    width: '95%',
    backgroundColor: '#fff',
    // height: "auto",
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
    // paddingHorizontal: 15,
    paddingBottom: 10,
  },
  dishTitleContainer: {paddingVertical: 10},
  dishTitleText: {fontSize: 17, fontFamily: theme.fonts.medium.fontFamily},
  dishDescriptionText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium.fontFamily,
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
  dishFeatureText: {fontFamily: 'Nunito-Medium', fontSize: 13},
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
  stickyHeaderContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    width: '100%',
  },
  smallBar: {
    height: 4,
    width: 90,
    backgroundColor: '#1b7a59e0',
    borderRadius: 50,
    alignSelf: 'center',
  },
  sliderContainer: {
    width: '100%',
    height: 250,
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 1,
  },
  dishTitleContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  dishTitleText: {
    fontSize: 22,
    fontFamily: 'OpenSans-Regular',
    color: '#000',
  },
  dishDescriptionText: {fontSize: 14, fontFamily: 'OpenSans-Regular'},
  cartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartButtonContainer: {},
  cartIconButton: {
    height: 65,
    width: 65,
    backgroundColor: '#eeeeee6b',
    borderRadius: 30,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  starContainer: {
    flexDirection: 'row',
  },
  priceText: {
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
  },
});
