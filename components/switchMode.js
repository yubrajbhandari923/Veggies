import {Text, TouchableOpacity, Image} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../routes/AuthProvider';
import {switchModeStyles as styles} from '../styles/AuthStyles';
import AsyncStorage from '@react-native-community/async-storage';

export default function SwitchMode() {
  const {setMode, mode} = useContext(AuthContext);
  const switchMode = async () => {
    try {
      let currentMode = await AsyncStorage.getItem('mode');
      let assign = currentMode == 'FARMER' ? 'CONSUMER' : 'FARMER';
      await AsyncStorage.setItem('mode', assign)
        .then(() => {
          setMode(assign);
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
