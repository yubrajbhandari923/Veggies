import React from 'react';
import Background from '../components/BackGround';
import Header from '../components/Header';
import Button from '../components/Button';
import InfoImage from '../components/InfoImage';
// import Paragraph from '../components/Paragraph'

export default function StartScreen({navigation}) {
  return (
    <Background>
      <InfoImage
        source={require('../assets/images/onboarding/onboard-1.jpg')}
      />
      <Header>VEGGIES</Header>
      {/* <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph> */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LOGIN_SCREEN')}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('REGISTER_SCREEN')}>
        Sign Up
      </Button>
    </Background>
  );
}
