import {View, Text, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../routes/AuthProvider';

export default function HomeScreen() {
  const {logout} = useContext(AuthContext);
  return (
    <View>
      <Text>HomeScreen</Text>
      <Pressable
        onPress={() => logout()}
        style={{backgroundColor: 'green', height: 50, width: 300}}>
        <Text>LOGOUT</Text>
      </Pressable>
    </View>
  );
}
