import {View, Text, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../routes/AuthProvider';

export default function ProfileScreen() {
  const {logout} = useContext(AuthContext);
  return (
    <View>
      <Pressable onPress={() => logout()}>
        <Text>LOGOUT</Text>
      </Pressable>
    </View>
  );
}
