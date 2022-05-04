import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function Logo({style}) {
  return (
    <Image
      source={require('../assets/images/logo.png')}
      style={{...styles.image, ...style}}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 8,
  },
});
