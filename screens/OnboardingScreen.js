import React from 'react';
import {Image, View, TouchableOpacity, Text} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {OnBoardStyles as onboardstyle} from '../styles/OnBoardingStyles';
import Octicons from 'react-native-vector-icons/Octicons';
import {useTheme} from '@react-navigation/native';
// this array consists the pages that will be rendered
const OnBoardPages = [
  {
    backgroundColor: '#fff',
    image: (
      <Image
        source={require('./../assets/images/onboarding/onboard-1.jpg')}
        style={{width: '100%', height: undefined, aspectRatio: 135 / 76}}
      />
    ),
    title: 'Veggies',
    subtitle: 'Something here',
  },
  {
    backgroundColor: '#fff',
    image: (
      <Image
        source={require('./../assets/images/onboarding/onboard-2.jpg')}
        style={{width: '100%', height: undefined, aspectRatio: 135 / 76}}
      />
    ),
    title: 'For Farmers ',
    subtitle: 'Some quote likes here',
  },
  {
    backgroundColor: '#fff',
    image: (
      <Image
        source={require('./../assets/images/onboarding/onboard-3.jpg')}
        style={{width: '100%', height: undefined, aspectRatio: 135 / 76}}
      />
    ),
    title: 'Some Title Here',
    subtitle: 'Some Subtitle here',
  },
];

//
export default function OnBoardingScreen({navigation, ...props}) {
  const {colors} = useTheme();
  const styles = onboardstyle(colors);
  return (
    <Onboarding
      onSkip={() => navigation.replace('LOGIN_SCREEN')}
      onDone={() => navigation.replace('LOGIN_SCREEN')}
      NextButtonComponent={() => null}
      SkipButtonComponent={props => <SkipButton styles={styles} {...props} />}
      DoneButtonComponent={props => <DoneButton styles={styles} {...props} />}
      DotComponent={props => <Dots styles={styles} {...props} />}
      bottomBarColor="#fff"
      bottomBarHeight={80}
      titleStyles={styles.onBoardTitleStyle}
      subTitleStyles={styles.onBoardSubTitleStyle}
      pages={[...OnBoardPages]}
    />
  );
}

const SkipButton = ({...props}) => {
  return <OnBoardingButton title="SKIP" icon="skip" isSkip={true} {...props} />;
};
const DoneButton = ({...props}) => {
  return (
    <OnBoardingButton title="DONE" icon="thumbsup" isSkip={false} {...props} />
  );
};

const Dots = ({styles, ...props}) => {
  return (
    <View style={props.selected ? styles.activeDot : styles.passiveDot}></View>
  );
};

const OnBoardingButton = ({styles, icon, title, isSkip, ...props}) => {
  return (
    <View
      style={{
        marginRight: isSkip ? 0 : 10,
        marginLeft: isSkip ? 10 : 0,
      }}>
      <TouchableOpacity
        {...props}
        activeOpacity={0.8}
        style={{
          ...styles.buttonStyle,
          flexDirection: isSkip ? 'row' : 'row-reverse',
        }}>
        <Octicons name={icon} size={15} color="#111" />
        <Text style={styles.buttonText}>{title} </Text>
      </TouchableOpacity>
    </View>
  );
};
