import {View, Image} from 'react-native';
import React, {Component} from 'react';

export default class LoadingScreen extends Component {
  render() {
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
}
