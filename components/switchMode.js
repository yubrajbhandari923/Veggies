import {Text, TouchableOpacity, Image} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../routes/AuthProvider';
import {switchModeStyles as styles} from '../styles/AuthStyles';
import AsyncStorage from '@react-native-community/async-storage';

export default function SwitchMode({navigation, referer}) {
  const {setMode, mode} = useContext(AuthContext);
  const switchMode = async () => {
    try {
      let currentMode = await AsyncStorage.getItem('mode');
      let assign = currentMode == 'FARMER' ? 'CONSUMER' : 'FARMER';
      await AsyncStorage.setItem('mode', assign)
        .then(() => {
          setMode(assign);
          // Now navigate to consumer or farmer
          // This navigation is only to show animation, the rendered pages and functions for both screens are same
          navigation.replace(
            assign == 'FARMER'
              ? referer == 'login'
                ? 'LOGIN_SCREEN-FARMER'
                : 'REGISTER_SCREEN-FARMER'
              : referer == 'login'
              ? 'LOGIN_SCREEN-CONSUMER'
              : 'REGISTER_SCREEN-CONSUMER',
          );
        })
        .catch(e => e);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity style={styles.switchContainer} onPress={switchMode}>
      <Image
        style={styles.switchImage}
        source={
          mode == 'FARMER'
            ? require('../assets/icons/farmer.png')
            : require('../assets/icons/customer.png')
        }
      />
      <Text style={styles.switchText}>{mode}</Text>
    </TouchableOpacity>
  );
}
