import {View, Image} from 'react-native';
import React from 'react';

export default function VeggiesLogoStartupScreen() {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Image
        source={require('../assets/images/logo.png')}
        style={{width: 300, resizeMode: 'contain'}}
      />
    </View>
  );
}
