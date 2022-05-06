import {Text, TouchableOpacity,Image} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../routes/AuthProvider';
import {switchModeStyles as styles} from '../styles/AuthStyles';

export default function SwitchMode() {
  const {setMode,mode} = useContext(AuthContext);
  const switchMode = () => {
    setMode(mode == 'FARMER' ? 'CONSUMER' : 'FARMER');
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
