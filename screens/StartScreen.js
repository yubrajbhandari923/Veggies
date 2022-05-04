import React from 'react';
import {Image} from 'react-native';
import Background from '../components/BackGround';
import Header from '../components/Header';
import Button from '../components/Button';
import InfoImage from '../components/InfoImage';
// import Paragraph from '../components/Paragraph'

export default function StartScreen({navigation}) {
  return (
    <Background>
      <InfoImage
        source={require('../assets/images/logo.png')}
        style={{marginBottom: 20}}
      />
      {/* <Header>VEGGIES</Header> */}

      <Button
        mode="contained"
        onPress={() => navigation.navigate('LOGIN_SCREEN', {mode: 'FARMER'})}
        icon={() => (
          <Icon iamgeLocation={require('../assets/icons/farmer.png')} />
        )}>
        I am a farmer
      </Button>

      <Button
        mode="outlined"
        icon={() => (
          <Icon iamgeLocation={require('../assets/icons/customer.png')} />
        )}
        onPress={() => navigation.navigate('LOGIN_SCREEN', {mode: 'CONSUMER'})}>
        I am a consumer
      </Button>
    </Background>
  );
}

const Icon = ({iamgeLocation}) => {
  return (
    <Image
      source={iamgeLocation}
      style={{height: 40, width: 40, resizeMode: 'contain', marginRight: 10}}
    />
  );
};
