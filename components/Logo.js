import React from 'react';
import {Image} from 'react-native';
import {logoStyles as styles} from '../styles/globalStyles';

export default function Logo({style}) {
  return (
    <Image
      source={require('../assets/images/logo.png')}
      style={{...styles.image, ...style}}
    />
  );
}
