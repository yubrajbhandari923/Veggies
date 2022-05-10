import {View, Text, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../routes/AuthProvider';

export default function Home() {
  const {logout} = useContext(AuthContext);
  return (
    <View>
      <Pressable
        onPress={() => logout()}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: 'green',
        }}>
        <Text>LOG-OUT</Text>
      </Pressable>
    </View>
  );
}
